import { Component, OnInit } from '@angular/core';
import { PointsTransactionService } from '../../providers/points-transaction.service';
import { Storage } from '@ionic/storage';
import { element } from '@angular/core/src/render3';

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
  levels = [{
    "end": 10000,
    "init": 0,
    "level": "Starter"
  },
  {
    "end": 25000,
    "init": 10001,
    "level": "Técnico"
  },
  {
    "end": 50000,
    "init": 25001,
    "level": "Jack Man"
  },
  {
    "end": 100000,
    "init": 50001,
    "level": "Piloto"
  }]
  constructor(private points: PointsTransactionService, private storage: Storage) {}

  ngOnInit() {
    this.getPointsTransaction()
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
