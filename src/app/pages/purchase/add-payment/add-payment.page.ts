import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.page.html',
  styleUrls: ['./add-payment.page.scss'],
})
export class AddPaymentPage implements OnInit {

  showMessage = false;

  constructor() { }

  ngOnInit() {
  }

  onClickHelp() {
    this.showMessage = true;
  }

  onCloseHelp() {
    this.showMessage = false;
  }

  onSubmit(form: NgForm) {
    console.log('submit add-card: ', form);
  }

}
