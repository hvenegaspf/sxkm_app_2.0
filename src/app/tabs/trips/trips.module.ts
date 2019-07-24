import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TripsPage } from './trips.page';
import { NipSetupComponent } from './nip-setup/nip-setup.component';
import { NipRequestComponent } from './nip-request/nip-request.component';

const routes: Routes = [
  {
    path: '',
    component: TripsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TripsPage, NipSetupComponent, NipRequestComponent],
  entryComponents: [NipSetupComponent, NipRequestComponent]
})
export class TripsPageModule {}
