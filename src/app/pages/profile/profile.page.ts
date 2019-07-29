import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/users.service';
import { GlobalService } from 'src/app/providers/global.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  user;
  car_select;

  constructor(private userService: UsersService, private storage: Storage, private globalService: GlobalService,
    private router: Router) {
    this.getUser();
    this.getCars();
  }

  ngOnInit() {
  }

  async getUser() {
    this.user = await this.userService.getUserById();
    console.log(this.user)
  }

  getCars() {
    this.getStorage('car').then((res) => {
      this.car_select = JSON.parse(res)
    })
  }

  profileEdit() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/profile-edit'], navigationExtras);
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
