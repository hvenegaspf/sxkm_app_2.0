import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/users.service';
import { GlobalService } from 'src/app/providers/global.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})

export class AddressPage implements OnInit {
  
  address;

  constructor( private userService: UsersService, private storage: Storage, private globalService: GlobalService,
    private router: Router ) {
      this.getAddress();
     }

  ngOnInit() { }

  async getAddress() {
    this.address = await this.userService.getUserAddressById();
    this.address = this.address[0]
    /* console.log('getAddress', this.address) */
  } 

  editAddress() {
    let navigationExtras: NavigationExtras = {
      state: {
        address: this.address
      }
    };
    this.router.navigate(['/address-edit'], navigationExtras);
  }

}
