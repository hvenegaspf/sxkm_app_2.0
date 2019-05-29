import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor( private actionSheetController: ActionSheetController ) { }

  ngOnInit() { }

  async onClickSelector() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona tu auto',
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Mini Cooper',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Tesla Model 3',
          handler: () => {
            console.log('actionsheet');
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
