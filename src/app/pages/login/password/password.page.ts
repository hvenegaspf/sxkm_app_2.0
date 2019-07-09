import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../providers/auth.service';
import { UiService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  showPassword = false;
  user:any
  loading: any;

  constructor(private storage: Storage, private authService: AuthService, private uiService: UiService,
              private navCtrl: NavController, public loadingCtlr: LoadingController,) { }

  ngOnInit() { }

  async onSubmit(form: NgForm) {
    const data = form.value
    await this.getStorage('user').then((res) => {
      this.user = (res)
    })
    this.user.password = data
    const valid = await this.authService.login(this.user);

    if (valid) {
      this.navCtrl.navigateRoot('/tabs', { animated: true });
      /* this.loading.dismiss(); */
    } else {
      /* this.loading.dismiss(); */
      this.uiService.templateAlert('El usuario o contraseña no son válidos.')
    }
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
