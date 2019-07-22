import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})

export class CarService {
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
          console.log('policy', res.response.data)
          resolve( res.response.data)
        });
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
