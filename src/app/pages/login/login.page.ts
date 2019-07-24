import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PasswordPage } from './password/password.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any={}
  params:any;
  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  Submit(form: NgForm) {
    const data = form.value
    this.user.email = data['email']
    console.log(this.user)
    let navigationExtras: NavigationExtras = {
      state: this.user.email
    };
    this.router.navigate(['password'], navigationExtras);
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
