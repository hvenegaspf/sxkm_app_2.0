import { Injectable } from '@angular/core';
import { LoadingController,ToastController, Platform} from '@ionic/angular';
declare var OpenPay;
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(public loadingCtrl: LoadingController) { }

  

}
