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

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
