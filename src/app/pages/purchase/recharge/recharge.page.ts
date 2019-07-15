import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController,ToastController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

  constructor(private navctrl: NavController) { }

  ngOnInit() {
  }
}
