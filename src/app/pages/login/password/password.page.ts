import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../../providers/auth.service';
import { UiService } from 'src/app/services/ui-service.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  showPassword = false;
  email:any;
  loading: any;
  password:string;
  user:any;

  constructor(private storage: Storage, private authService: AuthService, private uiService: UiService,
              private navCtrl: NavController, public loadingCtlr: LoadingController,private route: ActivatedRoute, private router: Router){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.email = this.router.getCurrentNavigation().extras.state.email;
      }
    });   
  }
  
  ngOnInit(){
  }
  
  async onSubmit(form: NgForm) {
    console.log(this.email)
    this.password = form.value
    this.user = {
      email: this.email,
      password: this.password
    }
    const valid = await this.authService.login(this.user);

    if (valid) {
      this.router.navigate(['tabs']);
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
