import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { responseListTrips } from '../interfaces/list-trips-interface';
import { Storage } from '@ionic/storage';


const URL = environment.path;

@Injectable({
  providedIn: 'root'
})

export class TripsService {
  car_id: any;
  details_id = '';
  trip_page = 0;
  token: any;
  header: any;
  user_id;
  url_santander = 'https://redtec.populusinsurtech.technology/api/v1/';


  constructor(private http: HttpClient, private navCtrl: NavController, private storage: Storage) { }

  getListTrips(pull: boolean = false, from, to, token, car_id) {
    this.token = token
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjI3MTI4NzMsInVzZXIiOnsiaWQiOjI0MywiZW1haWwiOiJwcnVlYmFzeGttQGdtYWlsLmNvbSJ9fQ.xIxxUo7V3TJPr12tJ3gEgI8wuS6zGnKZcyThb9EZtAU',
      'company_id': '2'
    });
    if (pull) {
      this.trip_page = 0;
    }
    this.trip_page++;
    /* console.log(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`) */
    return this.http.get<responseListTrips>(`${this.url_santander}trips?from=2019-03-26&to=2019-03-27&car_id=3&page=${this.trip_page}`, { headers: headers })
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
