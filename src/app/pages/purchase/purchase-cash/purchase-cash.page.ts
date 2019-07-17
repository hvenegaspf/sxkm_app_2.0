import { Component, OnInit } from '@angular/core';
import { Store } from '../../../interfaces/store';
import { GlobalService } from '../../../providers/global.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-purchase-cash',
  templateUrl: './purchase-cash.page.html',
  styleUrls: ['./purchase-cash.page.scss'],
})
export class PurchaseCashPage implements OnInit {
  type_purchases:any;
  stores:Store[]
  params:any;

  constructor(private route: ActivatedRoute, private router: Router, private globalService:GlobalService, private navCtrl: NavController) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.globalService.getStores().subscribe(
      stores => this.stores = stores
    )
  }

  chooseStore(store){
    this.params.store = store
    console.log(this.params)
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-confirm'], navigationExtras);
  }

  goBack(){
    this.navCtrl.back()
  }
}
