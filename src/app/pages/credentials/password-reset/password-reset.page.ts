import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  showPassword = false;

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit password-reset: ', form);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
