import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WelcomePage } from './welcome.page';
import { TrackingComponent } from '../sos/tracking/tracking.component';
import { PiaComponent } from '../pia/pia-component.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomePage, TrackingComponent, PiaComponent],
  entryComponents: [TrackingComponent]
})
export class WelcomePageModule {}
