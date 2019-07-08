import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.page.html',
  styleUrls: ['./password-edit.page.scss'],
})
export class PasswordEditPage implements OnInit {

  showPassword = false;

  constructor() { }

  ngOnInit() { }


  onSubmit(form: NgForm) {
    console.log('submit password-edit: ', form);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
