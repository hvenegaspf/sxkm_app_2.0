import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nip-edit',
  templateUrl: './nip-edit.page.html',
  styleUrls: ['./nip-edit.page.scss'],
})
export class NipEditPage implements OnInit {

  showPassword = false;

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit nip-edit: ', form);
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
