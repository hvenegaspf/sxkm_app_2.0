import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        /*  console.log('obtiene token: ', token) */
        this.setStorage('FCM_token', token)
      });

      //Events notifications
      /* this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          this.navCtrl.navigateRoot('/notificaciones', { animated: true });
        } else {
          this.navCtrl.navigateRoot('/notificaciones', { animated: true });
        }
      }); */
      
    });
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
