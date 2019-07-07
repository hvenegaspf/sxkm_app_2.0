import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nip-reset',
  templateUrl: './nip-reset.page.html',
  styleUrls: ['./nip-reset.page.scss'],
})
export class NipResetPage implements OnInit {

  showPassword = false;

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit nip-reset: ', form);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
