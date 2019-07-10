import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { OptionsComponent } from '../tabs/sos/options/options.component';
import { StatusComponent } from '../tabs/status/status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsRoutingModule,
  ],
  declarations: [TabsPage, OptionsComponent, StatusComponent],
  entryComponents: [OptionsComponent, StatusComponent]
})
export class TabsPageModule {}
