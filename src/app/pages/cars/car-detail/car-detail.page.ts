import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() { }

  async onAddDriver() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona tu auto',
      cssClass: 'actionsheet',
      buttons: [
        {
          text: 'Conductor A',
          icon: 'md-person',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Conductor B',
          icon: 'md-person',
          handler: () => {
            console.log('actionsheet');
          }
        },
        {
          text: 'Agregar conductor',
          icon: 'md-add',
          handler: () => {
            this.router.navigate(['/add-driver'])
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
