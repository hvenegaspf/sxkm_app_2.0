import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CarService } from '../providers/car.service';
import { OptionsComponent } from '../tabs/sos/options/options.component';
import { GlobalService } from '../providers/global.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})

export class TabsPage implements OnInit {
  dueDate:any
  actual_date:any;
  disabled:boolean;

  cars: any = [];
  car_select: any;
  loading: any;
  currentTab: any;

  token;
  user_id;
  total_notification;

  constructor(
    private router: Router,
    private modalCtlr: ModalController,
    private actionSheetController: ActionSheetController,
    public events: Events, private storage: Storage,
    public loadingCtlr: LoadingController, private carService: CarService,
    private globalService: GlobalService,
    private statusBar: StatusBar
  ) { 
    this.events.subscribe('notification:deleted', (total) => {
      this.getNotifications(true);
    });

    this.events.subscribe('all_notification:all_deleted', (total) => {
      this.getNotifications(true);
    });
  }

  ionViewWillEnter() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#023B48');
    this.getStorage('car').then((res) => {
      this.car_select = JSON.parse(res);
      this.getCars()
      this.getNextDueDate()
      this.getNotifications(true)
    })
    this.currentTab = window.location.pathname === '/tabs/tabs/welcome' ? 'welcome' : '';
  }

  ngOnInit() { }

  onClickSos() {
    this.modalCtlr.create({ component: OptionsComponent }).then(modal => { modal.present(); });
  }

  

  async getCars() {
    this.cars = await this.carService.getCars()
    /* console.log('tabsCars: ', this.cars) */
    if (this.cars.length !== 0) {
      if (this.car_select) {
        for (let element of this.cars) {
          if (element.car.details.id == this.car_select.car.details.id) {
            this.car_select = element
            this.setStorage('car', JSON.stringify(this.car_select))
            this.setStorage('car_id', JSON.stringify(this.car_select.car.details.id))
          }
        }
      } else {
        this.car_select = this.cars[0]
        /* console.log(this.car_select) */
        this.setStorage('car', JSON.stringify(this.car_select))
        this.setStorage('car_id', JSON.stringify(this.car_select.car.details.id))
        /* this.dataLastTrip() */
      }
    }
    console.log(this.car_select)
  }

  async getNotifications(pull: boolean = false, event?) {
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('user_id').then((res) => {
      this.user_id = Number(res)
    })

    await this.globalService.getListNotifications(pull, this.token, this.user_id).subscribe((response) => {
      console.log(response)
      this.total_notification = response['data']['total_notification'];
      this.events.publish('total:total', this.total_notification);
    })
  }


  async getNextDueDate(){
    let date = new Date();
    var day = date.getDate()
    var month = (date.getMonth()+1)
    var year = date.getFullYear()
    if (day < 10) {
      var dayString = '0' + Number(day);
    } else {
      var dayString = String(day);
    }
    if (month < 10) {
      var monthString = '0' + Number(month);
    } else {
      var monthString = String(month);
    }
    this.actual_date =  `${year}-${monthString}-${dayString}`
    this.dueDate = await this.globalService.getNextDueDate();
    console.log(this.dueDate.data)
    console.log(this.actual_date)
    if(this.actual_date > this.dueDate){
      console.log(true)
      this.disabled = true
    }else{
      console.log(false)
      this.disabled = false
    }
  }

  /* async onClickSelector() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona tu auto',
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Mini Cooper',
          icon: 'ios-car',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Tesla Model 3',
          icon: 'ios-car',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Administrar autos',
          icon: 'md-settings',
          handler: () => {
            this.router.navigate(['/cars'])
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        },
      ],
    });
    await actionSheet.present();
  } */

  changeCar() {
    this.presentLoading('Procesando', 500);
    this.setStorage('car', JSON.stringify(this.car_select))
    this.setStorage('car_id', JSON.stringify(this.car_select.car.details.id))
    this.events.publish('car:selected', this.car_select);
  }

  async presentLoading(message: string, duration) {
    this.loading = await this.loadingCtlr.create({
      message: message,
      duration: duration
    });
    return this.loading.present();
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
