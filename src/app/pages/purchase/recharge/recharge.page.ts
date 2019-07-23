import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController,ToastController, Platform} from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PaymentsService } from '../../../providers/payments.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  packages:any = [];
  params:any;
  constructor(private route: ActivatedRoute,private navCtrl: NavController, private router: Router, private paymentsService: PaymentsService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit() {
    this.getPackage()
  }

  async getPackage(){
    this.packages = await this.paymentsService.getkilometersPackage()
    console.log(this.packages)
  }

  goBack(){
    this.navCtrl.back()
  }

  choosePackage(selected_packages){
    this.params.package = selected_packages
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-options'], navigationExtras);
  }
}
