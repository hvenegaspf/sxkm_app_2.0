import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/providers/users.service';
import { Storage } from '@ionic/storage';
import { UiService } from 'src/app/services/ui-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.page.html',
  styleUrls: ['./address-edit.page.scss'],
})

export class AddressEditPage implements OnInit {

  addressForm:FormGroup;
  data: any;
  adrdress_id;
  loading:any;

  constructor( public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UsersService,
    private storage: Storage, private uiService: UiService, public loadingCtlr: LoadingController ) { 
    this.addressForm = formBuilder.group({
      'street': '',
      'external_number': '',  
      'internal_number': '',
      'postal_code': '',
      'colony': '',
      'city': '',
      'state': '',
      'country': ''
    })

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

  async onSubmit() {
    /* this.presentLoading('Actualizando perfil...'); */
    await this.getStorage('address_id').then((res) => {
      this.adrdress_id = JSON.parse(res)
    })
    this.userService.updateAddress( this.addressForm.value, this.adrdress_id ).then((res) => {
      /*  this.loading.dismiss(); */
       this.uiService.templateToast('Dirección actualizada', 3000);
       this.router.navigate(['/tabs/tabs/welcome']);
     })
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  async presentLoading( message: string) {
    this.loading = await this.loadingCtlr.create({
      message: message,
    });
     return this.loading.present();
  }
}
 