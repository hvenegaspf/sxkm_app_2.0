import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/providers/car.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-confirm-phone',
  templateUrl: './confirm-phone.page.html',
  styleUrls: ['./confirm-phone.page.scss'],
})

export class ConfirmPhonePage implements OnInit {
  phoneForm:FormGroup;
  data: any;
  token:any;
  car_id:any;
  sinister:any;
  long_position:any;
  lat_position:any;
  sos_type;

  constructor( public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private geolocation: Geolocation, private storage: Storage, private carService: CarService ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.sos_type;
        console.log('paraams', this.data)
        this.sos_type = this.data;
      }
    });

  }
  
  ngOnInit() {
  }
 
  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat_position = resp.coords.latitude
      this.long_position = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async createSinister( phone ){
    await this.getCurrentPosition();
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('car_id').then((res) => {
      this.car_id = Number(res)
    })
    this.sinister = {
      "car_id": this.car_id,
      "status": "pending",
      "longitude": this.long_position,
      "latitude": this.lat_position,
      "phone": phone,
      "number_s": "",
      "subject": this.sos_type
    }
    this.carService.createSinister(this.sinister, this.token).subscribe(response=>{
      console.log('createSinister', response)
    })
  }

  onSubmit(form){
    this.createSinister( form.value );
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
