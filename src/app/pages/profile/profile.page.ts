import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/providers/users.service';
import { GlobalService } from 'src/app/providers/global.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { Events, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  user;
  car_select;
  avatar:any;
  private base64textString:String="";
  constructor(private userService: UsersService, private storage: Storage, private globalService: GlobalService,
    private router: Router, public events: Events,) {
    this.getUser();
    this.getCars();
  }

  ngOnInit() {
  }

  async getUser() {
    this.user = await this.userService.getUserById();
  }

  getCars() {
    this.getStorage('car').then((res) => {
      this.car_select = JSON.parse(res)
    })
  }

  profileEdit() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/profile-edit'], navigationExtras);
  }

  // agregar/cambiar avatar
  onAddAvatar(evt) { 
    console.log('event', evt)
    let files = evt.target.files;
    let file = files[0];
  
    if (files && file) {
      let reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

    }
  }

  handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    let image = {
      "avatar_img": `data:image/png;base64,${this.base64textString}`
    }
    this.avatar = this.userService.updateAvatar(image)
    this.getUser()
    this.events.publish('image', image.avatar_img );
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
