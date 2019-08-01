import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PointsTransactionService } from '../../../providers/points-transaction.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {

  uiColor: string;
  current_level:any;
  params:any;
  token:any;
  levels:any = [];
  benefits:any = {};
  check:boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage, private points: PointsTransactionService,
              private navCtrl: NavController){
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
        this.current_level = element
        this.uiColor = this.current_level.color
        this.check = true;
      }
    });
  }

  changeLevel(level_checked){
    this.current_level = level_checked
    this.uiColor = level_checked.color
  }

  goBack(){
    this.navCtrl.back()
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
