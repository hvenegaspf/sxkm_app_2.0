import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatusPage } from './status.page';
import { StatusDetailComponent } from './status-detail/status-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatusPage, StatusDetailComponent],
  entryComponents: [StatusDetailComponent]
})
export class StatusPageModule {}
