import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {

  car_policy;

  constructor( private storage: Storage ) { }

  async ngOnInit() {
    await this.getStorage('car').then((res) => {
      this.car_policy = JSON.parse(res)
    })
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}


