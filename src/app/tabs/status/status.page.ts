import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsersService } from 'src/app/providers/users.service';
import { CarService } from '../../providers/car.service';
import { ModalController, Events } from '@ionic/angular';
import { StatusDetailComponent } from './status-detail/status-detail.component';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})

export class StatusPage implements OnInit {
  car: any;
  cars: any[] = [];
  car_select: any;
  dataCarDtcs: any;
  arraydtc: any[] = [];
  thrid_digit: any[] = [];
  dtcs: any;
  code: any;
  vin: any;
  fail_buttons = {
    sistema_electrico: {
      third_digit: [0],
      status: false
    },
    cumbustible: {
      third_digit: [1],
      status: false
    },
    inyectores: {
      third_digit: [2],
      status: false
    },
    sistema_encendido: {
      third_digit: [3],
      status: false
    },
    control_emisiones: {
      third_digit: [4],
      status: false
    },
    control_velocidad: {
      third_digit: [5],
      status: false
    },
    ecu: {
      third_digit: [6],
      status: false
    },
    transmision: {
      third_digit: [7, 8, 9],
      status: false
    }
  }

  constructor(private modalCtlr: ModalController, private userService: UsersService,
    private storage: Storage, private carService: CarService, public events: Events,
    private globalService: GlobalService) {
    /* this.globalService.setActivity('car', 'Mi auto'); */
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
      this.vin = this.car_select.car.details.vin.substring(0, 11)
      this.cleanFails();
      this.dataCarDtcs = [];
      this.thrid_digit = [];
      this.loadCarDtcs();
    });
  }

  ngOnInit() {
    this.getCars();
    this.getStorage('car').then((res) => {
      this.car_select = JSON.parse(res)
      this.vin = this.car_select.car.details.vin.substring(0, 11)
    })
    this.loadCarDtcs();
  }

  async getCars() {
    this.car = await this.carService.getCars()
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

  async loadCarDtcs() {
    this.dataCarDtcs = await this.carService.getCarDtcs();
    console.log('dataCarDtcs', this.dataCarDtcs)
    for (let code of this.dataCarDtcs) {
      this.thrid_digit.push(Number(code[2]))
    }
    this.validateCode();
  }

  validateCode() {
    this.fail_buttons.control_emisiones.status = this.validate(this.fail_buttons.control_emisiones.third_digit)
    this.fail_buttons.control_velocidad.status = this.validate(this.fail_buttons.control_velocidad.third_digit)
    this.fail_buttons.cumbustible.status = this.validate(this.fail_buttons.cumbustible.third_digit)
    this.fail_buttons.ecu.status = this.validate(this.fail_buttons.ecu.third_digit)
    this.fail_buttons.inyectores.status = this.validate(this.fail_buttons.inyectores.third_digit)
    this.fail_buttons.sistema_electrico.status = this.validate(this.fail_buttons.sistema_electrico.third_digit)
    this.fail_buttons.sistema_encendido.status = this.validate(this.fail_buttons.sistema_encendido.third_digit)
    this.fail_buttons.transmision.status = this.validate(this.fail_buttons.transmision.third_digit)
  }

  validate(array_value) {
    if (array_value.length === 1) {
      return this.thrid_digit.includes(array_value[0])
    } else {
      for (let element of array_value) {
        if (this.thrid_digit.includes(element)) {
          return true;
        }
      }
    }
  }

  openModalDtcs(digitCode, routeImgIndicator) {
    this.modalCtlr.create({
      component: StatusDetailComponent,
      componentProps: {
        digitCode: digitCode,
        arrayCodes: this.dataCarDtcs,
        routeImgIndicator: routeImgIndicator
      }
    }).then(ErrorModal => { ErrorModal.present(); });
  }


  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  cleanFails() {
    this.fail_buttons['sistema_electrico']['status'] = false
    this.fail_buttons['cumbustible']['status'] = false
    this.fail_buttons['inyectores']['status'] = false
    this.fail_buttons['sistema_encendido']['status'] = false
    this.fail_buttons['control_emisiones']['status'] = false
    this.fail_buttons['control_velocidad']['status'] = false
    this.fail_buttons['ecu']['status'] = false
    this.fail_buttons['transmision']['status'] = false
  }

}
