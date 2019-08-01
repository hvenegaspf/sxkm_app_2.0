import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../providers/payments.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  memberships:any =[];
  acquisiotions:any =[];
  constructor(private paymentService: PaymentsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getOrdersList()
  }

  async getOrdersList(){
    this.acquisiotions = await this.paymentService.getListAcquisiotions()
    this.memberships = await this.paymentService.getListMemberships()
    console.log('recharga',this.acquisiotions)
    console.log('memberships',this.memberships)
  }

  orderDetail(detail){
    let navigationExtras: NavigationExtras = {
      state: detail
    };
    this.router.navigate(['order-detail'], navigationExtras);
  }

}
