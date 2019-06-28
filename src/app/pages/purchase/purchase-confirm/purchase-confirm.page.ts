import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-confirm',
  templateUrl: './purchase-confirm.page.html',
  styleUrls: ['./purchase-confirm.page.scss'],
})
export class PurchaseConfirmPage implements OnInit {

  showMessage: boolean = false;

  constructor() { }

  ngOnInit() { }

  onClickHelp() {
    this.showMessage = true;
  }

  onCloseHelp() {
    this.showMessage = false;
  }

}
