import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsersService } from '../../../providers/users.service';
import { PaymentsService } from '../../../providers/payments.service';
import { async } from '@angular/core/testing';
declare var OpenPay;

@Component({
  selector: 'app-purchase-confirm',
  templateUrl: './purchase-confirm.page.html',
  styleUrls: ['./purchase-confirm.page.scss'],
})
export class PurchaseConfirmPage implements OnInit {

  //params route
  params:any;
  pay:any;

  loading:any;
  loading_window:any;
  deviceIdHiddenFieldName:any;
  card_saved_select:any;

  autoRenew: boolean = false;
  iconCheck = 'ios-square-outline';
  showAlert: boolean = false;

  policy_id:any;
  user:any;
  plan_id:any = null;

  constructor(public loadingCtrl: LoadingController,private route: ActivatedRoute, private router: Router, 
              private navCtrl: NavController, private storage: Storage, private usersService: UsersService, private paymentService: PaymentsService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params =  this.router.getCurrentNavigation().extras.state;
        console.log('confirm', this.params)
      }
    });
  }

  async ngOnInit(){
    await this.getStorage('car').then((res) => {
      this.policy_id = JSON.parse(res)
    })
    this.getUser()
    console.log(this.plan_id)
  }

  async getUser(){
    this.user = await this.usersService.getUserById()
  }

  goBack(){
    this.navCtrl.back()
  }

  payment(pay_method, type_payment){
    console.log(pay_method, type_payment)
    let ionic_this = this
    this.loading = true
    if(pay_method != 'Cash' && pay_method != 'Spei'){
      // OpenPay.setId('mtpac6zng162oah2h67h');
      // ​OpenPay.setApiKey('pk_42af74150db6413692eb47624a1e903a');
      // OpenPay.setSandboxMode(false);}
        OpenPay.setId('mdt4m9gkdvu9xzgjtjrk');
    ​    OpenPay.setApiKey('pk_3670bc7e899241ad87ceffb49757979c');
        OpenPay.setSandboxMode(true);
       this.deviceIdHiddenFieldName = OpenPay.deviceData.setup();
       ionic_this.openpayCardPaySaved(type_payment)
    } else if( pay_method == 'Spei' ||  pay_method == 'Cash'){
      this.payWithCash(type_payment)
    }
  }

  openpayCardPaySaved(type_payment){
    let json = {
      "user": {
        "id": this.user.id,
        "name": this.user.name,
        "last_name": this.user.lastname_one,
        "email": this.user.email,
        "phone": "5555555555"
      },
      "payment": {
        "policy_id": this.policy_id.policy_id,
        "gateway_id": this.params.gateway.id,
        "card_id": this.params.card.id,
        "device_session_id": this.deviceIdHiddenFieldName,
        "charge_type": this.params.type_payment,
        "requires_billing": true,
      }
    }
    if(type_payment == 'membership'){
      json['payment']['membership_cost'] = 299;
      json['payment']['amount'] = 299;
      json['payment']['plan_id'] = this.plan_id;
    }else if(type_payment == 'acquisition'){
      json['payment']['package_id'] = this.params.package.id;
      json['payment']['package_cost'] = this.params.package.cost_by_package;
      json['payment']['amount'] = this.params.package.cost_by_package;
    }
    this.presentLoading('Procesando');
    this.paymentService.payments(json).subscribe(
      (data:any)=>{
        this.pay = data
        if(this.pay){
          this.pay.method_payment = this.params.pay_method
          let navigationExtras: NavigationExtras = {
            state: this.pay
          };
          this.router.navigate(['purchase-success'], navigationExtras);
          this.dismissLoading() 
        }else{
          this.onPaymentFailed()
        }
      },
      (error:any)=>{
        this.onPaymentFailed()
      }
    )
    /* console.log(this.deviceIdHiddenFieldName) */
  }

  payWithCash(type_payment){
    let json = {
      "user": {
        "id": this.user.id,
        "name": this.user.name,
        "last_name": this.user.lastname_one,
        "email": this.user.email,
        "phone": "5555555555"
      },
      "payment": {
        "policy_id": this.policy_id.policy_id,
        "gateway_id": this.params.gateway.id,
        "charge_type": this.params.type_payment,
        "requires_billing": true
      }
    }
    
    if(type_payment == 'membership'){
      json['payment']['membership_cost'] = 299;
      json['payment']['amount'] = 299;
    }else{
      json['payment']['package_id'] = this.params.package.id;
      json['payment']['package_cost'] = this.params.package.cost_by_package;
      json['payment']['amount'] = this.params.package.cost_by_package;
    }

    this.presentLoading('Procesando');
    this.paymentService.payments(json)
    this.paymentService.payments(json).subscribe(
      (data:any)=>{
        this.pay = data
        if(this.pay){
          this.pay.method_payment = this.params.pay_method
          let navigationExtras: NavigationExtras = {
            state: this.pay
          };
          this.router.navigate(['purchase-success'], navigationExtras);
          this.dismissLoading() 
        }else{
          this.onPaymentFailed()
        }
      },
      (error:any)=>{
        this.onPaymentFailed()
      }
    )
  }

  onAutoRenew() {
    this.autoRenew = !this.autoRenew;
    !this.autoRenew ? this.iconCheck = 'ios-square-outline' : this.iconCheck = 'ios-checkbox-outline';
    if(this.autoRenew === true){
      this.plan_id = 3
    }else{
      this.plan_id = null
    }
    console.log(this.plan_id)
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
      message: message,
    });
    return this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
