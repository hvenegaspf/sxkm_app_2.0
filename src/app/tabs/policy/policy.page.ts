import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, Events, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CarService } from 'src/app/providers/car.service';

const URL = environment.devPath;

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})

export class PolicyPage implements OnInit {
  car_select:any;
  car: any;
  cars: any [] = []
  car_policy;
  url

  constructor( private storage: Storage, public events: Events, private carService: CarService){
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
    });
  }

  async ngOnInit() {
    this.url = URL;
    await this.getStorage('car').then((res) => {
      /* this.car_policy = JSON.parse(res) */
      this.car_select = JSON.parse(res)
    })
  }

  async getCars() {
    this.car = await this.carService.getCars()
    console.log('cars', this.car)
    if (this.car.length != 0) {
      for (let cars of this.car) {
        this.cars.push(cars)
      }
      if (this.car_select) {
        for (let element of this.cars) {
          if (element.car.details.id == this.car_select.car.details.id) {
            this.car_select = element
            break;
          }
        }
      } else {
        this.car_select = this.cars[0]
      }
    }
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}


