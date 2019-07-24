import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})

export class OptionsComponent implements OnInit {
  
  sos_type;

  constructor(private modalCtlr: ModalController, private router: Router) { }

  ngOnInit() {
  }

  confirmPhone(sos_type){
    let navigationExtras: NavigationExtras = {
      state: {
        sos_type
      }
    };
    this.router.navigate(['/confirm-phone'], navigationExtras);
    this.closeModal();
  }

  closeModal() {
    this.modalCtlr.dismiss();
  }

}
