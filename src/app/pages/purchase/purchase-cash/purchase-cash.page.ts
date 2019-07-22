import { Component, OnInit } from '@angular/core';
import { Store } from '../../../interfaces/store';
import { GlobalService } from '../../../providers/global.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { PaymentsService } from '../../../providers/payments.service';

@Component({
  selector: 'app-purchase-cash',
  templateUrl: './purchase-cash.page.html',
  styleUrls: ['./purchase-cash.page.scss'],
})
export class PurchaseCashPage implements OnInit {
  type_purchases:any;
  stores:Store[]
  gate_ways:any = [];
  params:any;

  constructor(private route: ActivatedRoute, private router: Router, private globalService:GlobalService, 
              private navCtrl: NavController, private paymentService: PaymentsService) { 
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

  async chooseStore(store){
    let name_gateway: any;
    if(store.store != 'Oxxo'){
      name_gateway = 'Store'
    }else{
      name_gateway = 'Oxxo'
    }
    this.gate_ways = await this.paymentService.getGateWay()
    this.gate_ways.forEach(element => {
        if(element.name == name_gateway){
         this.params.gateway = element 
        }
    });
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
