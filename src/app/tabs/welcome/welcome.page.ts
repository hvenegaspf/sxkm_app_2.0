import { Component, OnInit } from '@angular/core';

import { TrackingComponent } from '../sos/tracking/tracking.component';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  kms_status:any;
  constructor(private modalCtlr: ModalController, private router: Router, private globlaService: GlobalService, ) { }

  ngOnInit() {
    this.getKmStatus()
  }

  async getKmStatus(){
    this.kms_status = await this.globlaService.getKmStatus();
  }

  paySubscription(){
    let navigationExtras: NavigationExtras = {
      state: {
        type_payment: 'memberships'
      }
    };
    this.router.navigate(['purchase-options'], navigationExtras);
  }

  Recharge(){
    this.router.navigate(['recharge']);
  }

  onClickHelpWidget() {
    this.modalCtlr.create({ component: TrackingComponent }).then(modal => { modal.present(); });
  }

  
}
