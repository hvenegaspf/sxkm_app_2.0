import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  showPassword = false;

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit password: ', form);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
