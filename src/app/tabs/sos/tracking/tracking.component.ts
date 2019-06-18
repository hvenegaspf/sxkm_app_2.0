import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {

  constructor(private modalCtlr: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
