import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PointsTransactionService } from '../../../providers/points-transaction.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {

  uiColor: string = '#ffbb01';
  params:any;
  token:any;
  levels:any=[];
  check:boolean = false;
  level = [
    {
    level_name: 'Novato',
    color: '#0cc1f9'
    },
    {
      level_name: 'Guerrero',
      color: '#ffbb01'
    },
    {
    level_name: 'Rockstar',
    color: '#2ec23b'
    },
    {
    level_name: 'Leyenda',
    color: '#5387d1'
    },
  ]
  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private points: PointsTransactionService){
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
        console.log(this.params)
      }
    });
  }

  ngOnInit() {
    this.getLevels()
  }

  async getLevels(){
    await this.getStorage('auth_token').then((res) => {
      this.token = res
    })
    this.levels = await this.points.getLevels(this.token)
    this.levels.forEach(element => {
      if(element.level == this.params.level_current){
        console.log(element.level)
        this.check = true;
      }
    });
  }

  changeLevel(level_checked){
    if(level_checked == 'Novato'){
      this.uiColor = '#0cc1f9';
    }else if(level_checked == 'Guerrero'){
      this.uiColor = '#ffbb01';
    }else if(level_checked == 'Rockstar'){
      this.uiColor = '#2ec23b';
    }else if(level_checked == 'Leyenda'){
      this.uiColor = '#5387d1';
    }
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
