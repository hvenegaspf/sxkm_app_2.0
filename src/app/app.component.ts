import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from './providers/auth.service';
import { UiService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private navCtrl: NavController,
    private storage: Storage,
    private uiService: UiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        /* this.uiService.templateAlert('FCM_token: ' + token) */
        this.setStorage('FCM_token', token)
      });

      //Events notifications
      this.fcm.onNotification().subscribe(data => {
        console.log('notification ', data)
        if (data.wasTapped) {
          this.navCtrl.navigateRoot('/status', { animated: true });
        } else {
          this.navCtrl.navigateRoot('/status', { animated: true });
        }
      });
      
    });
  }

  logout() {
    this.auth.logout();
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
