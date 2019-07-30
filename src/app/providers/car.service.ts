import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { responseCarDtcs } from '../interfaces/car-dtcs';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})

export class CarService {
  url_dtc = "https://api.eu.apiconnect.ibmcloud.com/hella-ventures-car-diagnostic-api/api/v1/dtc?client_id=762bfe7a-29e5-49e5-a23c-0b45b2c08cc6&client_secret=F4pF3iH0wX7xQ7nK3iT3kS5fN4eY5xD6nW4mP5hV1oI3yC3lL8"
  car_id: any;
  user_id: any;
  token: any;

  constructor(private http: HttpClient, private navCtrl: NavController, private storage: Storage) { }

  async getCars() {
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
      'company_id': '2'
    });

    return new Promise(resolve => {
      this.http.get(`${URL}policy/${this.user_id}`, { headers: headers }).subscribe(
        (res: any) => {
          /* console.log('policy', res.response.data) */
          resolve( res.response.data)
        });
    })
  }

  async getCarDtcs() {
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('car_id').then((res) => {
      this.car_id = Number(res)
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return new Promise(resolve => {
      this.http.get<responseCarDtcs>(`${URL}trip_dtcs/last_report/${this.car_id}`, { headers: headers }).subscribe(
        (response) => {
          if (response.response.code === 200) {
            resolve(response.response.data.dtc_codes_detected)
          }
        }
      );
    })
  }

  getDtc(code, vin) {
    return new Promise(resolve => {
      /* console.log(`${this.url_dtc}&code_id=${code}&language=EN&vin=${vin}`) */
      this.http.get<any>(`${this.url_dtc}&code_id=${code}&language=EN&vin=${vin}`).subscribe(
        (response) => {
          resolve(response.dtc_data)
        }
      );
    })
  }

  createSinister(data, token) {
    console.log(data)
    this.token = token
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
      'company_id': '1'
    });
    return this.http.post(`${URL}claim`, data, { headers: headers })
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
