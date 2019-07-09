import { Component, OnInit } from '@angular/core';
import { ModalController, Events, LoadingController } from '@ionic/angular';
import { TripsService } from '../../providers/trips.service';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Storage } from '@ionic/storage';
import { CarService } from 'src/app/providers/car.service';
import Leaflet from 'leaflet';
import { GlobalService } from 'src/app/providers/global.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})

export class TripsPage implements OnInit {

  registeredNIP;
  validNip;
  nipTrips = null;
  askNIP = true;
  arrayTrips = [];
  dateTo;
  dateFrom;
  totalKms = 0;
  typeFilter = 'today';
  enabled: boolean = true;
  car_select: any;
  cars: any[] = [];
  car: any;
  map: any;
  car_id: any;
  token: any;
  loading: any;
  text_trips: boolean = true;

  constructor(private modalCtlr: ModalController, private tripsService: TripsService,
    public events: Events, private carService: CarService,
    private storage: Storage, public loadingCtlr: LoadingController,
    private globalService: GlobalService
  ) {
   /*  this.globalService.setActivity('trips', 'Viajes'); */
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
      this.arrayTrips = [];
      this.loadTrips(true);
    });
  }

  ngOnInit() {
    this.getCars();
    this.getStorage('car').then((res) => {
      this.car_select = JSON.parse(res)
    })
    this.selectFilter();
  }

  async getCars() {
    this.car = await this.carService.getCars()
    if (this.car.length != 0) {
      for (let cars of this.car) {
        this.cars.push(cars)
      }
      if (this.car_select) {
        for (let element of this.cars) {
          if (element.car.details.id == this.car_select.car.details.id) {
            this.car_select = element
            break;
          }
        }
      } else {
        this.car_select = this.cars[0]
      }
    }
  }

  async loadTrips(pull: boolean = false, event?) {
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('car_id').then((res) => {
      this.car_id = Number(res)
    })
    if (pull) {
      this.enabled = true;
      this.arrayTrips = [];
      this.totalKms = 0;
    }

    await this.getFilters();

    await this.tripsService.getListTrips(pull, this.dateFrom, this.dateTo, this.token, this.car_id).subscribe((response) => {
      console.log('loadTrips', response)
      this.loading.dismiss();
      this.arrayTrips.push(...response.data.trips)
      if (response.data.total) {
        this.totalKms = response.data.total;
      }
      this.loadMaps();
      if (event) {
        event.target.complete();
        if (response.data.trips.length === 0) {
          this.enabled = false;
        }
      }
    })
  }

  refreshTrips(event) {
    this.loadTrips(true, event)
  }

  loadMaps() {
    let map;

    this.arrayTrips = this.arrayTrips.filter(trip => 'init_trip' in trip && 'end_trip' in trip);
    for (let i = 0; this.arrayTrips.length > i; i++) {
      setTimeout(() => {
        this.map = new Map(`map-trip-${i + 1}`, { zoomControl: false }).setView([this.arrayTrips[i]['init_trip']['latitude'], this.arrayTrips[i]['init_trip']['longitude']], 13);

        Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: '',
          maxZoom: 18,
          center: [this.arrayTrips[i]['init_trip']['latitude'], this.arrayTrips[i]['init_trip']['longitude']],
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoicG9wdWx1c21hcHMiLCJhIjoiY2p2ODZ0bWxpMGV6NjQzbjMxd3RyZXczMCJ9.uUIweNXgj2PVTlEcm4GClg'
        }).addTo(this.map);

        var Start_icon = Leaflet.marker([this.arrayTrips[i]['init_trip']['latitude'], this.arrayTrips[i]['init_trip']['longitude']], {
          icon: Leaflet.icon({
            iconUrl: "assets/ui/map-start-point.svg",
            iconSize: [20, 25],
            iconAnchor: [20, 46]
          })
        })

        var End_icon = Leaflet.marker([this.arrayTrips[i]['end_trip']['latitude'], this.arrayTrips[i]['end_trip']['longitude']], {
          icon: Leaflet.icon({
            iconUrl: "assets/ui/map-end-point.svg",
            iconSize: [20, 25],
            iconAnchor: [20, 46]
          })
        })

        Start_icon.addTo(this.map);
        End_icon.addTo(this.map);
        this.map.invalidateSize();
      }, 50);
    }
  }

  selectFilter() {
    this.presentLoading('Buscando viajes....');
    this.loadTrips(true);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message,
    });
    return this.loading.present();
  }

  getFilters() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.dateTo.setDate(new Date().getDate() + 1);
    this.dateTo = this.formatDate(this.dateTo)
    switch (this.typeFilter) {
      case 'today':
        this.dateFrom = this.formatDate(this.dateFrom);
        break;
      case 'this-week':
        this.dateFrom.setDate(this.dateFrom.getDate() - 7);
        this.dateFrom = this.formatDate(this.dateFrom)
        break;
      case 'this-month':
        this.dateFrom.setMonth(this.dateFrom.getMonth() - 1);
        this.dateFrom = this.formatDate(this.dateFrom)

        break;
      case 'previous-month':
        this.dateFrom.setMonth(this.dateFrom.getMonth() - 2);
        this.dateFrom = this.formatDate(this.dateFrom)

        break;
    }
  }

  formatDate(date) {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }


}
