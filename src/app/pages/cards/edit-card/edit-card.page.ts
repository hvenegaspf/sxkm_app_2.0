import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../../../providers/global.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.page.html',
  styleUrls: ['./edit-card.page.scss'],
})
export class EditCardPage implements OnInit {
  card:any
  constructor(private router: Router, private route: ActivatedRoute, private navCtrl: NavController,
              private actionSheetController: ActionSheetController, private globalService: GlobalService){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.card = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit(){
    console.log(this.card)
  }

  async onClickOptions(id_card) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Remove card');
            this.globalService.deleteCard(id_card)
            this.navCtrl.back()
          }
        },
        /* {
          text: 'Editar',
          handler: () => {
            console.log('Edit card // remover el atributo *disabled* de los campos del form');
          }
        }, */
        {
          text: 'Cancelar',
          role: 'cancel'
        },
      ],
    });
    await actionSheet.present();
  }

  goBack(){
    this.navCtrl.back()
  }

}
