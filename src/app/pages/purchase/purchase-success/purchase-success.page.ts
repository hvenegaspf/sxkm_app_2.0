import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.page.html',
  styleUrls: ['./purchase-success.page.scss'],
})
export class PurchaseSuccessPage implements OnInit {
  params:any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.params = this.router.getCurrentNavigation().extras.state;
      }
    });
  }

  ngOnInit() {
    console.log(this.params)
  }

}
