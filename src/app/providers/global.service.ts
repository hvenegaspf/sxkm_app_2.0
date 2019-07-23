import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Store } from '../interfaces/store';
import { STORES } from '../interfaces/stores';
import { UsersService } from './users.service';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  policy_id:any;
  token:any;
  id_user:any
  user:any;
  constructor(private http: HttpClient, private storage: Storage, private userService: UsersService) { }

  getStores(): Observable<Store[]> {
	  return of(STORES);
  }

  async getKmStatus(){
    await this.getStorage('car').then((res) => {
      this.policy_id = JSON.parse(res)
    })
    
    return new Promise(resolve => {
      this.http.get(`${URL}acquisitions/${this.policy_id.policy_id}/km_status`).subscribe(
        (response:any) => {
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
          resolve(response.data)
        });
    })
  }

  //Add card for payments
  async addCard(data){
    return new Promise(resolve =>{
      this.http.post(`${URL}cards`,data).subscribe(
        (res:any)=>{
          resolve(res)
        }
      )
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
