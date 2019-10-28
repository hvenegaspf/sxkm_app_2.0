import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { responseListTrips } from '../interfaces/list-trips-interface';
import { responseDrivingHabits } from '../interfaces/driving-habits-interface';
import { Storage } from '@ionic/storage';
import { responseLastTrip } from '../interfaces/last-trip-interface';


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

  constructor(private http: HttpClient, private navCtrl: NavController, private storage: Storage) { }

  getListTrips(pull: boolean = false, from, to, token, car_id) {
    this.token = token
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    if (pull) {
      this.trip_page = 0;
    } 
    this.trip_page++;
    /* console.log(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`) */
    console.log(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`)
    return this.http.get<responseListTrips>(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`, { headers: headers })
  }

  async getTripDetails (id_details) {
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(resolve => {
      /* console.log(`${URL}trip/details/${id_details}`) */
      this.http.get<responseLastTrip>(`${URL}trips/details/${id_details}`, {headers:headers}).subscribe(
        (response) => {
          console.log('getTripDetails', response)
          if (response.code === 200) {
            resolve(response.data)
          }
        }
      );
    })
  }

  getDrivingHabits(from, to, token, car_id) {
    this.token = token
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': token
    });
    return new Promise(resolve => {
      /* console.log(`${URL}driving_habits?from=${from}&to=${to}&car_id=${car_id}`) */
      console.log(`${URL}trips?from=${from}&to=${to}&car_id=${car_id}&page=${this.trip_page}`)
      this.http.get<responseDrivingHabits>(`${URL}trips/driving_habits?from=2019-07-23&to=2019-07-29&car_id=${car_id}`, {headers:headers}).subscribe(
        (response) => {
          if (response.code === 200) {
            resolve(response.data)
          }
        }
      );
    })
  }

  async hasNip() {
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    await this.getStorage('user_id').then((res)=>{
      this.user_id = Number(res)
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(resolve => {
      /* console.log(`${URL}trip/last_report/${this.car_id}`) */
      this.http.get(`${URL}users/${this.user_id}/has_nip`, {headers:headers}).subscribe(
        (response) => {
          if (response['code'] === 200) {
            resolve(response['data']['has_nip'])
          }else{
            resolve('')
          }
        }
      );
    })
  }

  async validateNip(nip) {
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    await this.getStorage('user_id').then((res)=>{
      this.user_id = Number(res)
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    const BODY = {
      "nip" : nip
    }
    return new Promise(resolve => {
      /* console.log(`${URL}users/${this.user_id}/validate_nip`) */
      this.http.post(`${URL}users/${this.user_id}/validate_nip`, BODY,{headers:headers}).subscribe(
        (response) => {
          if (response['code'] === 200) {
            resolve(response['data']['valid'])
          }else{
            resolve('')
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
