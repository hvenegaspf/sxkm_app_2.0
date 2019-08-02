import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from '../../../providers/global.service';
import { UsersService } from '../../../providers/users.service';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CardIO } from '@ionic-native/card-io/ngx';
import { async } from '@angular/core/testing';
import { StatusBar } from '@ionic-native/status-bar/ngx';
declare var OpenPay;

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
  deviceIdHiddenFieldName:any;
  showMessage: boolean = false;
  scanReponse:any
  card:any;
  user:any;
  loading:any;
  showAlert: boolean = false;
  token_openpay:any = "";
  card_mumber:any;
  
  constructor(private gobalService: GlobalService, private userService: UsersService, private navCtrl: NavController, private toastCtrl: ToastController,
              private loadingCtrl: LoadingController, private route: ActivatedRoute, private router: Router, private cardIO: CardIO) { }

  ngOnInit() { 
  }
  
  ionViewWillEnter(){
    this.getUser()
  }

  camara(){
    this.cardIO.canScan().then((res: boolean) => {
      if(res){
        let options = {
          requireExpiry: true,
          requireCVV: true,
          requirePostalCode: false,
          requireCardholderName: true,
          scanExpiry:true,
          useCardIOLogo:true
        };
        this.cardIO.scan(options).then(data =>{
          this.card = data
          this.scanComplete()
        },
        (error)=>{
          console.log(error)
        })
      }else{
        this.onPaymentFailed()
      }
    });
  }

  scanComplete(){
    this.presentLoading('Procesando');
    console.log(this.card)
    let monthString = ''
    let yearString = ''
    if (this.card.expiryMonth < 10) {
      monthString = '0' + Number(this.card.expiryMonth);
    } else {
      monthString = String(this.card.expiryMonth);
    }
    yearString = String(this.card.expiryYear).slice(2,4)      
    this.card.cardNumber = this.card.cardNumber
    this.card.cardHolder = this.card.cardholderName
    this.card.cardExpiration_year = yearString
    this.card.cardExpiration_month = monthString
    this.card.cardCvv = this.card.cvv
    this.TokenOpenpay()
  }

  async getUser(){
    this.user = await this.userService.getUserById()
  }

  onClickHelp() {
    this.showMessage = true;
  }

  onCloseHelp() {
    this.showMessage = false;
  }

  onSubmit(form: NgForm) {
    this.presentLoading('Procesando');
    let date = new Date(form.value.cardDate);
    let monthString = ''
    let yearString = ''
    if (date.getMonth()+1 < 10) {
      monthString = '0' + Number(date.getMonth()+1);
    } else {
      monthString = String(date.getMonth()+1);
    }
    yearString = String(date.getFullYear()).slice(2,4)
  
    this.card = form.value
    this.card.cardExpiration_month = monthString
    this.card.cardExpiration_year = yearString
    this.TokenOpenpay()
  }

  TokenOpenpay(){
    let angular_this = this;
    OpenPay.setId('mdt4m9gkdvu9xzgjtjrk');
​    OpenPay.setApiKey('pk_3670bc7e899241ad87ceffb49757979c');
    OpenPay.setSandboxMode(true);
    this.deviceIdHiddenFieldName = OpenPay.deviceData.setup();
    var sucess_callbak = function (response){
      angular_this.token_openpay = response.data.id;
      angular_this.addCard();
    }
    var errorCallback =function (response){
      angular_this.token_openpay = response.data.id;
      angular_this.onPaymentFailed();
    }

    OpenPay.token.create({
      "card_number": this.card.cardNumber,
      "holder_name": this.card.cardHolder,
      "expiration_year": this.card.cardExpiration_year,
      "expiration_month": this.card.cardExpiration_month,
      "cvv2": this.card.cardCvv
    },sucess_callbak, errorCallback);
  }

  addCard(){
    console.log(this.user)
    let json = {
      "user": {
        "id": this.user.id,
        "name": this.user.name,
        "last_name": this.user.lastname_one,
        "email": this.user.email,
        "phone": "5555555555"
      },
      "card": {
        "gateway_id": 2,
        "card_token": this.token_openpay,
        "device_session_id": this.deviceIdHiddenFieldName
      }
    }
    this.gobalService.addCard(json).subscribe(
      (res:any)=>{
        console.log(res)
        this.router.navigate(['cards']);
        this.dismissLoading()
      },
      (error:any)=>{
        console.log(error)
        this.onPaymentFailed()
      }
    )
  }
  
  onPaymentFailed() {
    this.dismissLoading()
    this.showAlert = true;
  }

  onCloseAlert() {
    this.showAlert = false;
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message
    });
    return this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  goBack(){
    this.navCtrl.back()
  }

}
