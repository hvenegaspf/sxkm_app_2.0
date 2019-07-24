import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../providers/payments.service';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { EditCardPage } from './edit-card/edit-card.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cards:any = [];
  constructor(private paymentService: PaymentsService, private navCtrl: NavController, private route: ActivatedRoute, 
              private router: Router) { }

  ionViewWillEnter(){
    this.getCards()
  }

  ngOnInit() {
  }

  async getCards(){
    this.cards = await this.paymentService.getCards()
  }

  editCard(card){
    let navigationExtras: NavigationExtras = {
      state: card
    };
    this.router.navigate(['edit-card'], navigationExtras);
  }

  goBack(){
    this.navCtrl.back()
  }

}
