import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { RewardsPage } from './rewards.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      // defaults
      radius: 60,
      space: -16,
      outerStrokeWidth: 16,
      innerStrokeWidth: 16,
      innerStrokeColor: "#d7d7d7",
      backgroundPadding: 0,
      responsive: true,
      showUnits: false,
      showSubtitle: false,
      titleFontSize: '66',
      titleFontWeight: '700',
      animation: true,
      animationDuration: 300,
    }),
  ],
  declarations: [RewardsPage]
})
export class RewardsPageModule {}
