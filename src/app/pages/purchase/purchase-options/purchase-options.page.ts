import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-options',
  templateUrl: './purchase-options.page.html',
  styleUrls: ['./purchase-options.page.scss'],
})
export class PurchaseOptionsPage implements OnInit {
  type_purchases
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.type_purchases = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('parametros', this.type_purchases)
  }

  ionViewDidLoad() {
  }

}
