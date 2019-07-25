import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { responseUser } from '../interfaces/user-interface';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  token: any;
  user_id:any;

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  async getUserById(){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
     })
     await this.getStorage('auth_token').then((res)=>{
       this.token = res
     })
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(
      resolve => {
        this.http.get<responseUser>(`${URL}users/${this.user_id}`, {headers:headers}).subscribe(
        (response:any) => {
          if(response.code === 200){
            resolve(response.data)
          }
        })
      }
    )
  }

  async getUserAddressById(){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
     })
     await this.getStorage('auth_token').then((res)=>{
       this.token = res
     })
     let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(
      resolve => {
        this.http.get(`${URL}users/${this.user_id}/addresses`, {headers:headers}).subscribe(
        (response:any) => {
          if(response.code === 200){
            resolve(response.data.items)
          }
        })
      }
    )
  }

  async updateUser(body){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(
      resolve=>{
        this.http.put(`${URL}users/${this.user_id}`, body, {headers:headers}).subscribe(
          (response: any)=>{
            resolve(response)
          }
        )
      }
    )
  }

  async updateAddress(body){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(
      resolve=>{
        this.http.put(`${URL}users/${this.user_id}/update_address`, body, {headers:headers}).subscribe(
          (response: any)=>{
            console.log('updateAddress', response)
            resolve(response)
          }
        )
      }
    )
  }

  async updatePassword(body){
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token
    });
    return new Promise(
      resolve=>{
        this.http.put(`${URL}users/${this.user_id}/reset_password`, body, {headers:headers}).subscribe(
          (response: any)=>{
            console.log('updatePassword', response)
            resolve(response)
          }
        )
      }
    )
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
