import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../providers/payments.service';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cards:any = [];
  constructor(private paymentService: PaymentsService, private navCtrl: NavController) { }

  ionViewWillEnter(){
    this.getCards()
  }

  ngOnInit() {
  }

  async getCards(){
    this.cards = await this.paymentService.getCards()
  }

  goBack(){
    this.navCtrl.back()
  }

}
