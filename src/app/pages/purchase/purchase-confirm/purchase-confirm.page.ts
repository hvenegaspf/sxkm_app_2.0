import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, Platform, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsersService } from '../../../providers/users.service';
import { PaymentsService } from '../../../providers/payments.service';
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
  showAlert: boolean = false;

  policy_id:any;
  user:any;

  constructor(public loadingCtrl: LoadingController,private route: ActivatedRoute, private router: Router, 
              private navCtrl: NavController, private storage: Storage, private usersService: UsersService, private paymentService: PaymentsService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  async ngOnInit(){
    console.log(this.params)
    await this.getStorage('car').then((res) => {
      this.policy_id = JSON.parse(res)
    })
    this.getUser()
  }

  async getUser(){
    this.user = await this.usersService.getUserById()
  }

  goBack(){
    this.navCtrl.back()
  }

  payment(type_payment){
    console.log(type_payment)
    let ionic_this = this
    this.loading = true
    if(type_payment != 'Cash' && type_payment != 'Spei'){
      // OpenPay.setId('mtpac6zng162oah2h67h');
      // ​OpenPay.setApiKey('pk_42af74150db6413692eb47624a1e903a');
      // OpenPay.setSandboxMode(false);}
        OpenPay.setId('mdt4m9gkdvu9xzgjtjrk');
    ​    OpenPay.setApiKey('pk_3670bc7e899241ad87ceffb49757979c');
        OpenPay.setSandboxMode(true);
       this.deviceIdHiddenFieldName = OpenPay.deviceData.setup();
       ionic_this.openpayCardPaySaved()
    } else if( type_payment == 'Spei'){
      this.payWithSpei()
    } else if( type_payment == 'Cash'){
      this.payWithOxxo()
    }
  }

  async openpayCardPaySaved(){
    let json = {
      "payment": {
        "policy_id": this.policy_id.policy_id,
        "gateway_id": this.params.gateway.id,
        "card_id": this.params.card.id,
        "device_session_id": this.deviceIdHiddenFieldName,
        "charge_type": this.params.type_payment,
        "membership_cost": 299,
        "amount": 299,
        "requires_billing": true,
        "plan_id": 3
      },
      "user": {
        "id": this.user.id,
        "name": this.user.name,
        "last_name": this.user.lastname_one,
        "email": this.user.email,
        "phone": "5555555555"
      }
    }
    this.presentLoading('Procesando');
    this.pay = await this.paymentService.payMembership(json)
    if(this.pay.code == 200){
      this.pay.method_payment = this.params.pay_method
      let navigationExtras: NavigationExtras = {
        state: this.pay
      };
      this.router.navigate(['purchase-success'], navigationExtras);
      this.loading.dismiss()
    }else{
      this.onPaymentFailed
    }
    /* console.log(this.deviceIdHiddenFieldName) */
  }

  async payWithSpei(){
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
        "membership_cost": 299,
        "amount": 299,
        "requires_billing": true
      }
    }
    this.presentLoading('Procesando');
    this.pay = await this.paymentService.payMembership(json)
    if(this.pay.code == 200){
      this.pay.method_payment = this.params.pay_method
      let navigationExtras: NavigationExtras = {
        state: this.pay
      };
      this.router.navigate(['purchase-success'], navigationExtras);
      this.loading.dismiss()
    }else{
      this.onPaymentFailed
    }
  }

  async payWithOxxo(){
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
        "membership_cost": 299,
        "amount": 299,
        "requires_billing": true
      }
    }
    this.presentLoading('Procesando');
    this.pay = await this.paymentService.payMembership(json)
    if(this.pay.code == 200){
      this.pay.method_payment = this.params.pay_method
      let navigationExtras: NavigationExtras = {
        state: this.pay
      };
      this.router.navigate(['purchase-success'], navigationExtras);
      this.loading.dismiss()
    }else{
      this.onPaymentFailed
    }
  }

  onAutoRenew() {
    this.autoRenew = !this.autoRenew;
  }

  onPaymentFailed() {
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

  setStorage(key: string, value: string) {
    this.storage.set(key, value);
  }
  
  async getStorage(key: string) {
    let valueStorage = await this.storage.get(key);
    return valueStorage;
  }

}
