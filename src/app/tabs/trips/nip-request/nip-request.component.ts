import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TripsService } from '../../../providers/trips.service';
import { UiService } from 'src/app/services/ui-service.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-nip-request',
  templateUrl: './nip-request.component.html',
  styleUrls: ['./nip-request.component.scss'],
})

export class NipRequestComponent implements OnInit {

  autoRenew: boolean = false;
  showAlert: boolean = false;
  validNip;
  showPassword = false;
  icon = 'md-eye';

  constructor(private modalCtlr: ModalController, private tripService:TripsService,
    private storage: Storage, private uiService: UiService) { }

  ngOnInit() {}

  async onSubmit(nip: NgForm) {
    let nipValue = nip.form.value['enterNIP'];
    nipValue = nipValue.toString();
    this.validNip = await this.tripService.validateNip(nipValue);
    if(this.validNip){
      this.setStorage('nip_trips', nipValue)
      this.onCancel();
    }else{
      this.uiService.templateAlert('Nip no válido.')
    }
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
    !this.showPassword ? this.icon = 'md-eye' : this.icon = 'md-eye-off';
  }

  onAutoRenew() {
    this.autoRenew = !this.autoRenew;
  }

  closeModal(){
    console.log('close modal')
    this.onCancel();
  }

  // cerrar modal
  onCancel() {
    this.modalCtlr.dismiss();
  }

}
