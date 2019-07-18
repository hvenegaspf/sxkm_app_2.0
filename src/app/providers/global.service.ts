import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Store } from '../interfaces/store';
import { STORES } from '../interfaces/stores';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  car:any;
  token:any;
  constructor(private http: HttpClient, private storage: Storage) { }

  getStores(): Observable<Store[]> {
	  return of(STORES);
  }

  async getKmStatus(){
   
    await this.getStorage('car').then((res) => {
      this.car = JSON.parse(res)
    })
    console.log(this.car.policy_id)
    
    return new Promise(resolve => {
      this.http.get(`${URL}acquisitions/${this.car.policy_id}/km_status`).subscribe(
        (response:any) => {
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
