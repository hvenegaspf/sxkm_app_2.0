import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'welcome', children: [
          { path: '', loadChildren: './welcome/welcome.module#WelcomePageModule' }
        ]
      },
      {
        path: 'trips', children: [
          { path: '', loadChildren: './trips/trips.module#TripsPageModule' }
        ]
      },
      {
        path: 'habits', children: [
          { path: '', loadChildren: './habits/habits.module#HabitsPageModule' },
        ]
      },
      {
        path: 'rewards', children: [
          { path: '', loadChildren: './rewards/rewards.module#RewardsPageModule' }
        ]
      },
      {
        path: 'policy', children: [
          { path: '', loadChildren: './policy/policy.module#PolicyPageModule' }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/welcome',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
