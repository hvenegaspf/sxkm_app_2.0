import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { TripsService } from 'src/app/providers/trips.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/providers/global.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})

export class TripDetailPage implements OnInit {
  map: any;
  dataTripDetails;
  routeLow;
  routeHigh;
  routeMedium;
  today;

  constructor( private tripsService: TripsService, private activatedRoute: ActivatedRoute, private globalService: GlobalService ) { 
    this.today = new Date();
  }

  async ngOnInit() {
    await this.loadmap();
  }

  async loadmap() {

    await this.activatedRoute.params.subscribe((param) => {
      this.tripsService.getTripDetails(param['id']).then((response) => {

        this.dataTripDetails = response
        this.dataTripDetails['idling_time'] = Math.floor(this.dataTripDetails['idling_time'] / 3600) 
        this.map = Leaflet.map('map-details');

        Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: '',
            maxZoom: 18,
            center: [this.dataTripDetails['init_trip']['latitude'], this.dataTripDetails['end_trip']['latitude']],
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicG9wdWx1c21hcHMiLCJhIjoiY2p2ODZ0bWxpMGV6NjQzbjMxd3RyZXczMCJ9.uUIweNXgj2PVTlEcm4GClg'
        }).addTo(this.map);

        this.map.setView([this.dataTripDetails['init_trip']['latitude'], this.dataTripDetails['end_trip']['latitude']], 9);

        console.log('dataTripDetails', this.dataTripDetails);
        let latlngsLow = this.dataTripDetails['low'] ? this.dataTripDetails['low'] : [];
        let latlngsMedium = this.dataTripDetails['medium'] ? this.dataTripDetails['medium'] : [];
        let latlngsHigh = this.dataTripDetails['high'] ? this.dataTripDetails['high'] : [];

        var Start_icon = Leaflet.marker( [this.dataTripDetails['init_trip']['latitude'], this.dataTripDetails['init_trip']['longitude']],{
          icon: Leaflet.icon({
          iconUrl: "assets/ui/map-start-point.svg",
          iconSize:     [20, 25],
          iconAnchor:   [20, 46]
          })
        })
    
        var End_icon = Leaflet.marker( [this.dataTripDetails['end_trip']['latitude'], this.dataTripDetails['end_trip']['longitude']],{
          icon: Leaflet.icon({
          iconUrl: "assets/ui/map-end-point.svg",
          iconSize:     [20, 25],
          iconAnchor:   [20, 46]
          })
        })

/*         let line = Leaflet.polyline([this.dataTripDetails['init_trip']['latitude'], this.dataTripDetails['end_trip']['latitude']], {color: "#76bd1d"}).addTo(this.map);
*/      let polylineLow = Leaflet.polyline(latlngsLow, { color: 'green' }).addTo(this.map);
        let polylineMedium = Leaflet.polyline(latlngsMedium, { color: 'blue' }).addTo(this.map);
        let polylineHigh = Leaflet.polyline(latlngsHigh, { color: 'red' }).addTo(this.map);

        Start_icon.addTo(this.map);
        End_icon.addTo(this.map);
        this.map.fitBounds(polylineLow.getBounds());
        this.map.fitBounds(polylineMedium.getBounds());
        this.map.fitBounds(polylineHigh.getBounds());
      })
    })

  }

}
