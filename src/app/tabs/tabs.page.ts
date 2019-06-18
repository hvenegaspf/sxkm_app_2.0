import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { OptionsComponent } from '../tabs/sos/options/options.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtlr: ModalController,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() { }

  onClickSos() {
    this.modalCtlr.create({ component: OptionsComponent }).then(modal => { modal.present(); });
  }

  async onClickSelector() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona tu auto',
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Mini Cooper',
          icon: 'ios-car',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Tesla Model 3',
          icon: 'ios-car',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Administrar autos',
          icon: 'md-settings',
          handler: () => {
            this.router.navigate(['/cars'])
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        },
      ],
    });
    await actionSheet.present();
  }

}
