import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nip-request',
  templateUrl: './nip-request.component.html',
  styleUrls: ['./nip-request.component.scss'],
})
export class NipRequestComponent implements OnInit {

  autoRenew: boolean = false;
  showAlert: boolean = false;

  constructor() { }

  ngOnInit() {}

  onAutoRenew() {
    this.autoRenew = !this.autoRenew;
  }

}
