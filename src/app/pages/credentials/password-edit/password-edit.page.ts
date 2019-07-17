import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/providers/users.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui-service.service';


@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.page.html',
  styleUrls: ['./password-edit.page.scss'],
})
export class PasswordEditPage implements OnInit {

  showPassword = false;

  constructor( private userService: UsersService, private _router: Router,  private uiService: UiService) { }

  ngOnInit() { }


  async onSubmit(form: NgForm) {
    /* console.log('submit password-edit: ', form.value); */
    let body = {
      new_password : form.value.newPassword,
      current_password :form.value.currentPassword
    }
    
    let updateResponse = await this.userService.updatePassword(body);
    if(updateResponse['code'] == '200'){
      await this.uiService.templateToast('Contraseña actualizada', 2500);
      this._router.navigate(["/tabs/tabs/welcome"]);
    }
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

}
