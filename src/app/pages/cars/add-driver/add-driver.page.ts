import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.page.html',
  styleUrls: ['./add-driver.page.scss'],
})
export class AddDriverPage implements OnInit {

  showAlert = false;

  constructor() { }

  ngOnInit() { }

  showAlertModal() {
    this.showAlert = true;
  }

  onSubmit(form: NgForm) {
    this.showAlertModal()
    console.log('submit invite: ', form);
  }

}
