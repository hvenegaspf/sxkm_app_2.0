import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/global.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ModalController, Events } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NotificationDetailPage } from './notification-detail/notification-detail.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  arrayNotifications;
  token;
  user_id;
  enabled;
  text_notifications:boolean = false;
  loading: any;
  
  constructor( private globalService: GlobalService, private storage: Storage
    ,public events: Events, private alertController: AlertController, private modalCtlr: ModalController
    ,public loadingCtlr: LoadingController, private router: Router ) {
    //Create activity
   }

  ngOnInit() { 
    this.loadNotifications(true);
  }
  
  async loadNotifications(pull:boolean = false, event?) {
    this.presentLoading('Procesando');
    await this.getStorage('auth_token').then((res)=>{
      this.token = res
    })
    await this.getStorage('user_id').then((res)=>{
      this.user_id = Number(res)
    })
    if(pull){
      this.enabled = true;
      this.arrayNotifications = [];
    }
    
    await this.globalService.getListNotifications(pull, this.token, this.user_id).subscribe((response) => {
      this.arrayNotifications.push(...response['data']['notifications'])
      this.dismissLoading();
      if(this.arrayNotifications.length === 0){
        this.text_notifications = true
      }else{
        this.text_notifications = false
      }
      if (event) {
        event.target.complete();
        if (response['data']['notifications'].length === 0) {
          this.enabled = false;
        }
      }
    })
  }

  /* refreshNotifications(event){
    this.loadNotifications(true, event)
  } */

  // borrar notificación
  async onDelete(push_id) {
    await this.arrayNotifications.forEach((element,index) => {
      if(element.id === push_id){
        this.arrayNotifications.splice(index, 1)
      }
    });
    await this.globalService.setNotificationSaw(push_id).subscribe(( response) =>{
      this.events.publish('notification:deleted', this.arrayNotifications.length);
      this.loadNotifications(true)
    })
  }

  // borrar todas las notificaciones
  async onDeleteAll() {
    await this.arrayNotifications.forEach(element => {
      this.globalService.setNotificationSaw(element.id).subscribe((response) =>{
      })
      this.events.publish('all_notification:all_deleted', this.arrayNotifications.length);
    });
    /* this.arrayNotifications = []; */
    this.loadNotifications(true);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message
    });
    return this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '¿Está seguro que desea eliminar <strong>todas</strong> las notificaciones?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirmar',
          cssClass: 'primary',
          handler: () => {
            this.onDeleteAll()
          }
        }
      ]
    });

    await alert.present();
  }

  openModalDetailNotification(notification){
    let navigationExtras: NavigationExtras = {
      state: {
        notification: notification
      }
    };
    this.router.navigate(['notification-detail'], navigationExtras);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
