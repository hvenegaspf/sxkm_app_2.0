import { Component, OnInit } from '@angular/core';
import { PointsTransactionService } from '../../providers/points-transaction.service';
import { Storage } from '@ionic/storage';
import { ModalController, Events, LoadingController } from '@ionic/angular';
import { element } from '@angular/core/src/render3';
import { CarService } from 'src/app/providers/car.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  arrayPointsTransactions = [];
  car_id: any;
  token: any;
  enabled: boolean = true;
  reward_points;
  reward_percent;
  car_select: any
  car:any;
  cars = [];
  levels: any;
  constructor(private points: PointsTransactionService, private storage: Storage, public events: Events, private carService: CarService, private router: Router) {
    events.subscribe('car:selected', (car_selected) => {
      this.car_select = car_selected
      this.getCars();
      this.getPointsTransaction(true)
    });
  }

  ionViewWillEnter(){
  }
  
  ngOnInit() {
    this.getCars();
    this.getLevels();
    this.getPointsTransaction();
  }

  async getLevels(){
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    this.levels = await this.points.getLevels(this.token)
    console.log(this.levels)
  }

  showLevel(level){
    console.log(level)
    let navigationExtras: NavigationExtras = {
      state: {
        level_current: level
      }
    };
    this.router.navigate(['levels'], navigationExtras);
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
    this.reward_points = this.car_select['car']['details']['reward_points']
    this.fillProgressBar();
  }

  fillProgressBar(){
    this.levels.forEach((lvl) =>{
      if(this.reward_points >= lvl.init && this.reward_points <= lvl.end){
        this.reward_percent = (this.reward_points * 100) / lvl.end;
      }
    })
  }

  async getPointsTransaction(pull: boolean = false, event?){
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    await this.getStorage('car_id').then((res) => {
      this.car_id = Number(res)
    })
    if (pull) {
      this.enabled = true;
      this.arrayPointsTransactions = [];
    }
    await this.points.getPointsTransactions(pull, this.token, this.car_id).subscribe(
      (data:any)=>{
        console.log(data)
        data.response.data.forEach((element)=>{
          this.levels.forEach((lvl) =>{
            if(element.latest_score >= lvl.init && element.latest_score <= lvl.end){
              element['level_name'] = lvl.level
            }
          })
        })
        this.arrayPointsTransactions.push(...data.response.data)
        if (event) {
          event.target.complete();
          if (data.response.data.length === 0) {
            this.enabled = false;
          }
        }
      },(error:any)=>{
        console.log(error)
      }
    )
  }

  refreshPointsTransactions(event) {
    this.getPointsTransaction(true, event)
  }


  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
