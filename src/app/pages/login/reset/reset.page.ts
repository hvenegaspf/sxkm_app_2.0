import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  showAlert = false;

  constructor() { }

  ngOnInit() { }

  showAlertModal() {
    this.showAlert = true;
  }

  onSubmit(form: NgForm) {
    this.showAlertModal()
    console.log('submit reset: ', form);
  }

}
