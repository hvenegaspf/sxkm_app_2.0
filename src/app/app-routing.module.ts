import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  { path: 'initial', loadChildren: './pages/initial/initial.module#InitialPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'password', loadChildren: './pages/login/password/password.module#PasswordPageModule' },
  { path: 'reset', loadChildren: './pages/login/reset/reset.module#ResetPageModule' },
  // from menu pages
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'address', loadChildren: './pages/address/address.module#AddressPageModule' },
  { path: 'payment', loadChildren: './pages/payment/payment.module#PaymentPageModule' },
  { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
  { path: 'credentials', loadChildren: './pages/credentials/credentials.module#CredentialsPageModule' },
  { path: 'sxkm', loadChildren: './pages/sxkm/sxkm.module#SxkmPageModule' },
  // from tabs
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'detail', loadChildren: './tabs/trips/detail/detail.module#DetailPageModule' },
  { path: 'levels', loadChildren: './tabs/rewards/levels/levels.module#LevelsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
