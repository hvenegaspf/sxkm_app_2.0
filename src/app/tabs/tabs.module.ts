import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { CarSelectorComponent } from '../modals/car-selector/car-selector.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingModule,
  ],
  declarations: [TabsPage, CarSelectorComponent],
  entryComponents: [CarSelectorComponent]
})
export class TabsPageModule {}
