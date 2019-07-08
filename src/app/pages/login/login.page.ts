import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PasswordPage } from './password/password.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user:any={}
  constructor(private storage: Storage) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const data = form.value
    this.user.email = data['email']
    console.log(this.user)
    this.setStorage('user', this.user) 
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
