import { Component, OnInit } from '@angular/core';

import { TrackingComponent } from '../sos/tracking/tracking.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private modalCtlr: ModalController
  ) { }

  ngOnInit() { }

  onClickHelpWidget() {
    this.modalCtlr.create({ component: TrackingComponent }).then(modal => { modal.present(); });
  }

}
