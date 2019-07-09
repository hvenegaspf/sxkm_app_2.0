import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

const URL = environment.path;

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
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
      'company_id': '2'
    });
    /* this.header = this.HEADERS.append('Authorization', this.token);
    this.header = this.header.append('company_id', 2); */
    return new Promise(resolve => {
      this.http.get(`${URL}policy/${this.user_id}/car`, { headers: headers }).subscribe(
        (response: any) => {
          resolve(response.data)
        });
    })
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }
}
