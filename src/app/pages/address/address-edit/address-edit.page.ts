import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})

export class AddressEditPage implements OnInit {

  addressForm:FormGroup;
  data: any;

  constructor( public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UsersService ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.address;
        /* console.log('paraams', this.data) */
        this.addressForm = formBuilder.group({
          'street': [ this.data['street'] ],
          'external_number': [ this.data['external_number'] ],  
          'internal_number': [ this.data['internal_number'] ],
          'postal_code': [ this.data['postal_code'] ],
          'colony': [ this.data['colony'] ],
          'city': [ this.data['city'] ],
          'state': [ this.data['state'] ],
          'country': [ this.data['country'] ]
        })
        /* this.addressForm.setValue( this.data ) */
      }
    });

  }

  ngOnInit() { }

  onSubmit() {
    console.log( this.addressForm.value );
    /* this.userService.updateAddress( this.addressForm.value ); */
  }

}
 