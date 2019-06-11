import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sos-modal',
  templateUrl: './sos-modal.component.html',
  styleUrls: ['./sos-modal.component.scss'],
})
export class SosModalComponent implements OnInit {

  constructor( private modalCtlr: ModalController ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
