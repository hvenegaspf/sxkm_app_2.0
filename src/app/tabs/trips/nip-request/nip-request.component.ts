import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-nip-request',
  templateUrl: './nip-request.component.html',
  styleUrls: ['./nip-request.component.scss'],
})
export class NipRequestComponent implements OnInit {

  autoRenew: boolean = false;
  showAlert: boolean = false;

  constructor(private modalCtlr: ModalController) { }

  ngOnInit() {}

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
