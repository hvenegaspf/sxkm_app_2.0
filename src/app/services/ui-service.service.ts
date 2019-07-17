import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertController: AlertController, public toastController: ToastController,
    public loadingCtlr: LoadingController) { }

  async templateAlert( message: string ) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async templateToast( message: string , time ) {
    const toast = await this.toastController.create({
      message: message,
      duration: time
    });
    toast.present();
  }
}
