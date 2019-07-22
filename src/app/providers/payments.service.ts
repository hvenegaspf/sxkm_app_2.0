import { Injectable } from '@angular/core';
import { LoadingController,ToastController, Platform} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
declare var OpenPay;

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  HEADERS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  user_id:any;
  constructor(public loadingCtrl: LoadingController, private http: HttpClient, private storage: Storage) { }

  async getCards(){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })

    return new Promise(resolve => {
      this.http.get(`${URL}cards/${this.user_id}`).subscribe(
        (res: any) => {
          console.log('policy', res.data)
          resolve(res.data)
        });
    })
  }

  async getGateWay(){
    return new Promise(resolve => {
      this.http.get(`${URL}payment_gateways`).subscribe(
        (res: any) => {
          console.log('policy', res.data)
          resolve(res.data)
        });
    })
  }

  async payMembership(json){
    console.log(json)
    return new Promise(resolve => {
      this.http.post(`${URL}payments`, json, this.HEADERS).subscribe(
        (res: any) => {
          resolve(res)
        });
    })
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
}
