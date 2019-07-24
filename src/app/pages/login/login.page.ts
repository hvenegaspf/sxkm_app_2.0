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
  email:string;
  params:any;
  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const data = form.value
    this.email = data['email']
    let navigationExtras: NavigationExtras = {
      state: {
        email: this.email
      }
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
