import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-confirm',
  templateUrl: './purchase-confirm.page.html',
  styleUrls: ['./purchase-confirm.page.scss'],
})
export class PurchaseConfirmPage implements OnInit {

  autoRenew: boolean = false;
  showAlert: boolean = false;

  constructor() { }

  ngOnInit() { }

  onAutoRenew() {
    this.autoRenew = !this.autoRenew;
  }

  onPaymentFailed() {
    this.showAlert = true;
  }

  onCloseAlert() {
    this.showAlert = false;
  }

}
