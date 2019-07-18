import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PaymentsService } from '../../../providers/payments.service';

@Component({
  selector: 'app-purchase-options',
  templateUrl: './purchase-options.page.html',
  styleUrls: ['./purchase-options.page.scss'],
})
export class PurchaseOptionsPage implements OnInit {
  params:any;
  cards:any = [];
  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController,
              private paymentService: PaymentsService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit() {
    this.getCards() 
  }

  async getCards(){
    this.cards = await this.paymentService.getCards()
  }

  paymentCard(pay_method, card){
    this.params.pay_method = pay_method
    this.params.card = card
    console.log(this.params)
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-confirm'], navigationExtras);
  }

  paymentCash(pay_method){
    this.params.pay_method = pay_method
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-cash'], navigationExtras);
  }

  paymentSpei(pay_method){
    this.params.pay_method = pay_method
    console.log(this.params)
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-confirm'], navigationExtras);
  }

  goBack(){
    this.navCtrl.back()
  }

  ionViewDidLoad() {
  }

}
