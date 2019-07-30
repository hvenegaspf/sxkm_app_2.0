import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TripsService } from '../../../providers/trips.service';
import { UsersService } from '../../../providers/users.service';
import { UiService } from '../../../services/ui-service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nip-edit',
  templateUrl: './nip-edit.page.html',
  styleUrls: ['./nip-edit.page.scss'],
})

export class NipEditPage implements OnInit {

  showPassword = false;
  loading:any;

  constructor( private modalCtlr: ModalController, private tripService: TripsService, private userService: UsersService,
    private uiService: UiService, private navCtrl:NavController, public loadingCtlr: LoadingController, private router: Router ) { }

  ngOnInit() { }

  async onSubmit(form: NgForm) {
    console.log('submit nip-edit: ', form.value);

    this.presentLoading('Actualizando nip...');
    const formValues = form.value;

    const validNip = await this.tripService.validateNip(formValues['currentNip']);
    let body = {
      "nip" : formValues['newNip']
    }
    if (validNip) {
      await this.userService.updateUser(body).then(() =>{
        this.uiService.templateToast('Nip actualizado...', 3000)
        this.router.navigate(['/tabs/tabs/welcome']);
        this.onCancel();
        this.loading.dismiss();
      })
    } else {
      this.uiService.templateAlert('Nip actual incorrecto.')
      this.loading.dismiss();
    }
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCancel() {
    this.modalCtlr.dismiss();
  }

  async presentLoading( message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message,
    });
     return this.loading.present();
  }

}
