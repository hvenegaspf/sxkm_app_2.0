import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})
export class AddressEditPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit address-edit: ', form);
  }

}
