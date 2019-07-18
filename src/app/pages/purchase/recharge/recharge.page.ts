import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController,ToastController, Platform} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back()
  }

  choosePackage(){
    let navigationExtras: NavigationExtras = {
      state: {
        package: 1,
        type_payment: 'recharge'
      }
    };
    this.router.navigate(['purchase-options'], navigationExtras);
  }
}
