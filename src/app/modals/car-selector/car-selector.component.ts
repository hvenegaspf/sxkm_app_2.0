import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss'],
})
export class CarSelectorComponent implements OnInit {

  constructor( private modalCtlr: ModalController ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
