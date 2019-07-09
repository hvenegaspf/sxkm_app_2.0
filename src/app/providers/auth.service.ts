import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  HEADERS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  user:any;
  token:any;
  constructor(private http: HttpClient, private storage: Storage) { }

  async login(data){
    this.user = data
    this.user.entry_point = 'sxmk_app'
    return new Promise(resolve => {
      this.http.post(`${URL}sessions/login `, this.user, this.HEADERS).subscribe(
        (response:any) => {
          console.log(response)
          if (response.code === 200) {
            this.setStorage('auth_token', response.data.token);
            this.setStorage('user_id', JSON.stringify(response.data.user_id));
            this.setStorage('user_email', response.data.user.email);            
            resolve(true)
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false)
          }
        }, 
        (error) => {
          resolve(false)
        }
      );
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
