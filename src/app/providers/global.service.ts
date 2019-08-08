import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Store } from '../interfaces/store';
import { STORES } from '../interfaces/stores';
import { UsersService } from './users.service';
import { PolicyPage } from '../tabs/policy/policy.page';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  policy:any;
  token:any;
  id_user:any
  user:any;
  trip_page;
  constructor(private http: HttpClient, private storage: Storage, private userService: UsersService) { }

  getStores(): Observable<Store[]> {
	  return of(STORES);
  }

  async getKmStatus(){
    await this.getStorage('car').then((res) => {
      this.policy = JSON.parse(res)
    })
    
    return new Promise(resolve => {
      this.http.get(`${URL}acquisitions/${this.policy.policy_id}/km_status`).subscribe(
        (response:any) => {
          /* console.log(response) */
          resolve(response.data)
        });
    })
  }

  async getNextDueDate(){
    await this.getStorage('user_id').then((res) => {
      this.id_user = Number(res)
    })
    
    return new Promise(resolve => {
      this.http.get(`${URL}memberships/${this.id_user}/next_due_date`).subscribe(
        (response:any) => {
          /* console.log(response) */
          resolve(response)
        });
    })
  }

  //Add card for payments
  addCard(data){
    return this.http.post(`${URL}cards`,data)
  }

  async deleteCard(id_card){
    return new Promise(resolve =>{
      this.http.delete(`${URL}cards/${id_card}`).subscribe(
        (res:any)=>{
          console.log(res)
          resolve(res)
        }
      )
    })
  }

  //notification list
  getListNotifications( pull: boolean = false, token, user_id ) {
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
    return this.http.get(`${URL}push_notifications/${user_id}?page=${this.trip_page}`, {headers:headers})
  }


  setNotificationSaw(push_id) {
    this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    this.getStorage('user_id').then((res)=>{
      this.id_user = res
    })
    let headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': this.token,
      'company_id': '2'
    });
    const BODY = {
      "push_id": push_id
    }
    return this.http.put(`${URL}push_notifications/remove_notification_from_views`, BODY,{headers:headers});
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  

  
}
