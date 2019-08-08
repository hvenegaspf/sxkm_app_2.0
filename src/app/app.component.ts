import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from './providers/auth.service';
import { Events } from '@ionic/angular';
import { UiService } from 'src/app/services/ui-service.service';
import { GlobalService } from './providers/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  showAlert = false;

  token;
  user_id;
  total_notification;

  constructor(
    private globalService: GlobalService,
    private auth: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private navCtrl: NavController,
    private storage: Storage,
    public events: Events
  ) {
    this.initializeApp();
    this.getNotifications(true);
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
        /* console.log('notification: ' + JSON.stringify(data)) */
        this.events.publish('new:notification', data);
        if (data.wasTapped) {
          this.navCtrl.navigateRoot('/tabs/tabs/welcome', { animated: true });
        } else {
          this.navCtrl.navigateRoot('/tabs/tabs/welcome', { animated: true });
        }
      });
    });
  }

  async getNotifications(pull:boolean = false, event?){
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    await this.getStorage('user_id').then((res)=>{
      this.user_id = Number(res)
    })

    await this.globalService.getListNotifications(pull, this.token, this.user_id).subscribe((response) => {
      this.total_notification = response['data']['total_notification'];
    })
  }

  
  logout() {
    this.auth.logout();
    this.showAlert = false;
  }
  
  showAlertModal() {
    this.showAlert = true;
  }
  
  closeAlertModal() {
    this.showAlert = false;
  }
  
  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
