import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchaseCashPage } from './purchase-cash.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseCashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseCashPage]
})
export class PurchaseCashPageModule {}
