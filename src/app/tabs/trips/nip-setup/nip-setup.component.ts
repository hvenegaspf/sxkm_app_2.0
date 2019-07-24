import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-nip-setup',
  templateUrl: './nip-setup.component.html',
  styleUrls: ['./nip-setup.component.scss'],
})
export class NipSetupComponent implements OnInit {

  constructor(private modalCtlr: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtlr.dismiss();
  }

}
