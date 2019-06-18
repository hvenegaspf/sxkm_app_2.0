import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  constructor(private modalCtlr: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
