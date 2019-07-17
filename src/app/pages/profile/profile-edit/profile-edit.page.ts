import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})

export class ProfileEditPage implements OnInit {

  userForm:FormGroup;
  data: any;

  constructor( public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UsersService ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
        this.userForm = formBuilder.group({
          'name': [ this.data['name'] ],
          'lastname_one': [ this.data['lastname_one'] ],  
          'lastname_two': [ this.data['lastname_two'] ],
          'telephone': [ {value:  this.data['acl_role']['company']['telephone'], disabled: true} ],
          'email': [ {value:  this.data['email'], disabled: true} ]
        })
        /* this.userForm.setValue( this.data ) */
      }
    });
   }

  ngOnInit() { }

  onSubmit() {
    console.log( this.userForm.value );
    /* this.userService.updateAddress( this.addressForm.value ); */
  }

}
