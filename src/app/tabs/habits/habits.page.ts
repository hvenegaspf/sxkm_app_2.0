import { Component, OnInit } from '@angular/core';
import { ModalController, Events, LoadingController } from '@ionic/angular';
import { TripsService } from 'src/app/providers/trips.service';
import { GlobalService } from 'src/app/providers/global.service';
import { CarService } from '../../providers/car.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})

export class HabitsPage implements OnInit {
  /* Habits */
  dateTo;
  dateFrom;
  dataDrivingHabits;
  typeFilter = 'today';
  cars: any[] = [];
  car: any;
  loading: any;

  /* Cars variables */
  car_select: any;
  token: any;
  car_id: any;
  user: any;
  use_time_hrs;
  unit_use_time = 'hr';

  constructor(private modalCtlr: ModalController, private tripsService: TripsService,
    public events: Events, private carService: CarService, private storage: Storage, public loadingCtlr: LoadingController,
    private globalService: GlobalService, private activatedRoute: ActivatedRoute) {
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
      this.loadDrivingHabits();
      this.getCars();
    });
  }

  ngOnInit() {
  }

  async loadDrivingHabits() {
    await this.getFilters();
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('car_id').then((res) => {
      this.car_id = Number(res)
    })
    this.dataDrivingHabits = await this.tripsService.getDrivingHabits(this.dateFrom, this.dateTo, this.token, this.car_id);
    console.log('dataDrivingHabits', this.dataDrivingHabits)
    this.use_time_hrs = this.dataDrivingHabits['use_time'] / 3600;
    this.unit_use_time = 'hr';
    if (this.use_time_hrs < 1) {
      this.use_time_hrs = this.use_time_hrs * 60;
      this.unit_use_time = 'min';
    }
    this.loading.dismiss();
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
    } else {
    }
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

  async presentLoading(message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message,
    });
    return this.loading.present();
  }

}
