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
  gate_ways:any = [];
  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController,
              private paymentService: PaymentsService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ionViewWillEnter(){
    this.getCards()
  }
  
  ngOnInit() { 
  }

  async getCards(){
    this.cards = await this.paymentService.getCards()
  }

  async paymentCard(pay_method, card){
    this.gate_ways = await this.paymentService.getGateWay()
    this.gate_ways.forEach(element => {
      if(element.name == pay_method){
       this.params.gateway = element 
      }
    });
    this.params.pay_method = pay_method
    this.params.card = card
    console.log(this.params)
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-confirm'], navigationExtras);
  }

  async paymentCash(pay_method){
    this.params.pay_method = pay_method
    let navigationExtras: NavigationExtras = {
      state: this.params
    };
    this.router.navigate(['purchase-cash'], navigationExtras);
  }

  async paymentSpei(pay_method){
    this.gate_ways = await this.paymentService.getGateWay()
    this.gate_ways.forEach(element => {
      if(element.name == pay_method){
       this.params.gateway = element 
      }
    });
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
