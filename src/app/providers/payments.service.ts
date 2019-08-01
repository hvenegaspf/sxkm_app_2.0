import { Injectable } from '@angular/core';
import { LoadingController,ToastController, Platform} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { PolicyPage } from '../tabs/policy/policy.page';
declare var OpenPay;

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  user_id:any;
  policy_id:any;
  token:any;
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

  async getkilometersPackage(){
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })

    let Headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });

    await this.getStorage('car').then((res)=>{
      this.policy_id = JSON.parse(res)
      console.log(this.policy_id.policy_id)
    })

    return new Promise(resolve =>{
      this.http.get(`${URL}policy/costs/${this.policy_id.policy_id}`, {headers:Headers}).subscribe(
        (res:any)=>{
          /* console.log('package', res) */
          resolve(res)
        }
      )
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

  async payments(json){
    console.log(json)
    let HEADERS =  new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return new Promise(resolve => {
      this.http.post(`${URL}payments`, json, {headers:HEADERS}).subscribe(
        (res: any) => {
          resolve(res)
        });
    })
  }

  async getListMemberships(){
    await this.getStorage('car').then((res)=>{
      this.policy_id = JSON.parse(res)
      console.log(this.policy_id.policy_id)
    })
    return new Promise(resolve => {
      this.http.get(`${URL}transactions/${this.policy_id.policy_id}/membership/paid`).subscribe(
        (res: any) => {
          resolve(res.data)
        });
    })
  }

  async getListAcquisiotions(){
    await this.getStorage('car').then((res)=>{
      this.policy_id = JSON.parse(res)
      console.log(this.policy_id.policy_id)
    })
    return new Promise(resolve => {
      this.http.get(`${URL}transactions/${this.policy_id.policy_id}/acquisition/paid`).subscribe(
        (res: any) => {
          resolve(res.data)
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
