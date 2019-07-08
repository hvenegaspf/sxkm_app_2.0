import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  constructor() { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('submit profile-edit: ', form);
  }

}
