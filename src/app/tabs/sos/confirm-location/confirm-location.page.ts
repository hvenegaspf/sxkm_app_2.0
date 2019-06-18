import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-location',
  templateUrl: './confirm-location.page.html',
  styleUrls: ['./confirm-location.page.scss'],
})
export class ConfirmLocationPage implements OnInit {

  showAlert = false;

  constructor() { }

  ngOnInit() { }

  showAlertModal() {
    this.showAlert = true;
  }

  closeAlertModal() {
    this.showAlert = false;
  }

}
