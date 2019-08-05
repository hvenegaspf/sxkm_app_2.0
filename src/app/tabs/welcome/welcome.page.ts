import { Component, OnInit } from '@angular/core';
import { TrackingComponent } from '../sos/tracking/tracking.component';
import { ModalController, Events } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../../providers/global.service';
import { CarService } from 'src/app/providers/car.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  kms_status:any;
  kms_porcent:any;
  dueDate:any
  actual_date:any;
  disabled:boolean;

  car_select:any;
  car:any;
  cars:any=[];
  constructor(private modalCtlr: ModalController, private router: Router, private globlaService: GlobalService, public events: Events, private carService: CarService){
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
      this.getCars();
    });
  }

  ngOnInit() {
    this.getCars()
  }
  
  ionViewWillEnter(){
    this.getKmStatus()
    this.getNextDueDate()
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
            /* this.setStorage('car', JSON.stringify(this.car_select))
            this.setStorage('car_id', JSON.stringify(this.car_select.car.details.id)) */
            break;
          }
        }
      } else {
        this.car_select = this.cars[0]
        console.log(this.car_select)
        /* this.setStorage('car', JSON.stringify(this.car_select))
        this.setStorage('car_id', JSON.stringify(this.car_select.car.details.id)) */
      }
    } else {
    }
    this.getKmStatus()
    this.getNextDueDate()
  }

  async getNextDueDate(){
    let date = new Date();
    var day = date.getDate()
    var month = (date.getMonth()+1)
    var year = date.getFullYear()
    if (day < 10) {
      var dayString = '0' + Number(day);
    } else {
      var dayString = String(day);
    }
    if (month < 10) {
      var monthString = '0' + Number(month);
    } else {
      var monthString = String(month);
    }
    this.actual_date =  `${year}-${monthString}-${dayString}`
    this.dueDate = await this.globlaService.getNextDueDate();
    if(this.actual_date > this.dueDate){
      this.disabled = true
    }else{
      this.disabled = false
    }
  }

  async getKmStatus(){
    this.kms_status = await this.globlaService.getKmStatus();
    this.kms_porcent = (this.kms_status.used_km * 100)/this.kms_status.total_km + '%' 
  }

  paySubscription(){
    let navigationExtras: NavigationExtras = {
      state: {
        type_payment: 'membership'
      }
    };
    this.router.navigate(['purchase-options'], navigationExtras);
  }

  Recharge(){
    /* this.router.navigate(['recharge']); */
    let navigationExtras: NavigationExtras = {
      state: {
        type_payment: 'acquisition'
      }
    };
    this.router.navigate(['recharge'], navigationExtras);
  }

  onClickHelpWidget() {
    this.modalCtlr.create({ component: TrackingComponent }).then(modal => { modal.present(); });
  }

  
}
