import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  showMessage: boolean = false;

  constructor() { }

  ngOnInit() { }

  onClickHelp() {
    this.showMessage = true;
  }

  onCloseHelp() {
    this.showMessage = false;
  }

  onSubmit(form: NgForm) {
    console.log('submit add-card: ', form);
  }

}
