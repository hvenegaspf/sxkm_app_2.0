import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { responseListTrips } from '../interfaces/list-trips-interface';
import { responseDrivingHabits } from '../interfaces/driving-habits-interface';
import { Storage } from '@ionic/storage';


const URL = environment.devPath;

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
      'Authorization': this.token,
      'company_id': '2'
    });
    if (pull) {
      this.trip_page = 0;
    }
    this.trip_page++;
    /* console.log(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`) */
    return this.http.get<responseListTrips>(`${this.url_santander}trips?from=2019-03-26&to=2019-03-27&car_id=3&page=${this.trip_page}`, { headers: headers })
  }

  getDrivingHabits(from, to, token, car_id) {
    this.token = token 
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': token,
      'company_id': '2'
    });
    return new Promise(resolve => {
      /* console.log(`${URL}driving_habits?from=${from}&to=${to}&car_id=${car_id}`) */
      this.http.get<responseDrivingHabits>(`${this.url_santander}driving_habits?from=${from}&to=${to}&car_id=${car_id}`, {headers:headers}).subscribe(
        (response) => {
          if (response.code === 200) {
            resolve(response.data)
          }
        }
      );
    })
  }


  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
