import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TripsService } from 'src/app/providers/trips.service';
import { UsersService } from 'src/app/providers/users.service';
import { UiService } from 'src/app/services/ui-service.service';


@Component({
  selector: 'app-nip-setup',
  templateUrl: './nip-setup.component.html',
  styleUrls: ['./nip-setup.component.scss'],
})
export class NipSetupComponent implements OnInit {

  showPassword = false;
  icon = 'md-eye';

  constructor(private modalCtlr: ModalController, private tripService: TripsService, private userService: UsersService,
    private uiService: UiService) { }

  ngOnInit() {}

  async onSubmit(nipTrips: NgForm) {

    const formValues = nipTrips.form.value;
    let body = {
      "nip": formValues['setNIP']
    }
    await this.userService.updateUser(body).then(() => {
      this.uiService.templateToast('Nip actualizado', 2000 )
      this.onCancel();
    })
  }

  // aplicar lógica y cerrar modal
  onRegisterNIP() {
    this.modalCtlr.dismiss();
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
    !this.showPassword ? this.icon = 'md-eye' : this.icon = 'md-eye-off';
  }

  onCancel() {
    this.modalCtlr.dismiss();
  }

}
