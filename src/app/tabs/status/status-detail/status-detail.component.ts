import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CarService } from '../../../providers/car.service';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/providers/global.service';


@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.scss'],
})

export class StatusDetailComponent implements OnInit {
  @Input() digitCode: any;
  @Input() arrayCodes: any;
  @Input() routeImgIndicator;
  dtcs = [];
  arraydtc: any[] = []
  car: any;
  cars: any[] = [];
  car_select: any;
  vin: any;
  arrayDtcsDescription = [];
  newArrayCodes = [];
  urlImage = '';

  constructor( private http: HttpClient, private modalCtlr: ModalController, private storage: Storage, private carService: CarService,
    private globalService: GlobalService ) {
      /* this.globalService.setActivity('details-dtcs', "Detalle de fallas"); */
    }

    ionViewWillEnter(){
      this.urlImage = this.routeImgIndicator;
    }

  ngOnInit() {
    this.getDtcError()
  }

  async getDtcError() {
    let formatedVin = await this.getVinFormated()
    if (this.digitCode.length === 1) {
      this.newArrayCodes = this.arrayCodes.filter(code => parseInt(code[2]) === this.digitCode[0]);
      for (let newCode of this.newArrayCodes) {
        this.dtcs.push({
          code : newCode,
          message : await this.carService.getDtc(newCode, formatedVin)
        })
      }
    } else {
      for (let digit of this.digitCode) {
        this.newArrayCodes = this.arrayCodes.filter(code => parseInt(code[2]) === digit);
        for (let newCode of this.newArrayCodes) {
          this.dtcs.push(await this.carService.getDtc(newCode, formatedVin))
        }
      }
    }
  }

  async getVinFormated() {
    this.car_select = await this.getStorage('car');
    this.car_select = JSON.parse(this.car_select);
    this.vin = this.car_select.car.details.vin.substring(0, 11);
    return this.vin;
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

  onCancel() {
    this.modalCtlr.dismiss();
  }

}
