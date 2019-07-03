import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.page.html',
  styleUrls: ['./edit-card.page.scss'],
})
export class EditCardPage implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() { }

  async onClickOptions() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Remove card');
          }
        },
        {
          text: 'Editar',
          handler: () => {
            console.log('Edit card // remover el atributo *disabled* de los campos del form');
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
