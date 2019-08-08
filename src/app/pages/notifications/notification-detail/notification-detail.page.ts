import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {
  notification;
  timeNotification;
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.notification =  this.router.getCurrentNavigation().extras.state;
        this.timeNotification = this.calcTime(-10, this.notification.notification.created_at)
        console.log('confirm', this.notification)
      }
    });
  }
  
  ngOnInit() {
  }


  calcTime(offset, date) {
    let d = new Date(date)
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString()
  }

}
