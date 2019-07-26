import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/providers/users.service';
import { Observable } from 'rxjs';
import { UiService } from 'src/app/services/ui-service.service';
import { LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})

export class ProfileEditPage implements OnInit {

  userForm:FormGroup;
  private data: Observable<object>;
  loading:any;

  constructor( public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UsersService,
    private uiService: UiService, public loadingCtlr: LoadingController ) {
    this.userForm = this.formBuilder.group({
      'name': '',
      'lastname_one': '',  
      'lastname_two': '',
      'telephone': [ {value:  '', disabled: true} ],
      'email': [ {value:  '', disabled: true} ]
    })

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        this.userForm = this.formBuilder.group({
          'name': [ this.data['name'] ],
          'lastname_one': [ this.data['lastname_one'] ],  
          'lastname_two': [ this.data['lastname_two'] ],
          'telephone': [ {value:  this.data['acl_role']['company']['telephone'], disabled: true} ],
          'email': [ {value:  this.data['email'], disabled: true} ]
        })
      }
    });
    
   }

  ngOnInit() { }

  onSubmit() {
    /* this.presentLoading('Actualizando perfil...'); */
    this.userService.updateUser( this.userForm.value ).then((res) => {
     /*  this.loading.dismiss(); */
      this.uiService.templateToast('Perfil actualizado', 3000);
      this.router.navigate(['/tabs/tabs/welcome']);
    })
  }

  async presentLoading( message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message,
    });
     return this.loading.present();
  }


}
