import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  { path: 'initial', loadChildren: './pages/initial/initial.module#InitialPageModule' },
  // login pages
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'password', loadChildren: './pages/login/password/password.module#PasswordPageModule' },
  { path: 'reset', loadChildren: './pages/login/reset/reset.module#ResetPageModule' },
  // profile pages
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'profile-edit', loadChildren: './pages/profile/profile-edit/profile-edit.module#ProfileEditPageModule' },
  { path: 'address', loadChildren: './pages/address/address.module#AddressPageModule' },
  { path: 'address-edit', loadChildren: './pages/address/address-edit/address-edit.module#AddressEditPageModule' },
  // order pages
  { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
  { path: 'order-detail', loadChildren: './pages/orders/order-detail/order-detail.module#OrderDetailPageModule' },
  // credentials pages
  { path: 'credentials', loadChildren: './pages/credentials/credentials.module#CredentialsPageModule' },
  { path: 'nip-reset', loadChildren: './pages/credentials/nip-reset/nip-reset.module#NipResetPageModule' },
  { path: 'nip-edit', loadChildren: './pages/credentials/nip-edit/nip-edit.module#NipEditPageModule' },
  { path: 'password-edit', loadChildren: './pages/credentials/password-edit/password-edit.module#PasswordEditPageModule' },
  { path: 'password-reset', loadChildren: './pages/credentials/password-reset/password-reset.module#PasswordResetPageModule' },
  // payment method pages
  { path: 'cards', loadChildren: './pages/cards/cards.module#CardsPageModule' },
  { path: 'add-card', loadChildren: './pages/cards/add-card/add-card.module#AddCardPageModule' },
  { path: 'edit-card', loadChildren: './pages/cards/edit-card/edit-card.module#EditCardPageModule' },
  // purchase pages
  { path: 'recharge', loadChildren: './pages/purchase/recharge/recharge.module#RechargePageModule' },
  { path: 'add-payment', loadChildren: './pages/purchase/add-payment/add-payment.module#AddPaymentPageModule' },
  { path: 'purchase-cash', loadChildren: './pages/purchase/purchase-cash/purchase-cash.module#PurchaseCashPageModule' },
  { path: 'purchase-confirm', loadChildren: './pages/purchase/purchase-confirm/purchase-confirm.module#PurchaseConfirmPageModule' },
  { path: 'purchase-options', loadChildren: './pages/purchase/purchase-options/purchase-options.module#PurchaseOptionsPageModule' },
  { path: 'purchase-reference', loadChildren: './pages/purchase/purchase-reference/purchase-reference.module#PurchaseReferencePageModule' },
  { path: 'purchase-success', loadChildren: './pages/purchase/purchase-success/purchase-success.module#PurchaseSuccessPageModule' },
  // sxkm pages
  { path: 'sxkm', loadChildren: './pages/sxkm/sxkm.module#SxkmPageModule' },
  { path: 'privacy', loadChildren: './pages/sxkm/privacy/privacy.module#PrivacyPageModule' },
  { path: 'terms', loadChildren: './pages/sxkm/terms/terms.module#TermsPageModule' },
  // tabs
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // tab pages
  { path: 'trip-detail', loadChildren: './tabs/trips/trip-detail/trip-detail.module#TripDetailPageModule' },
  { path: 'levels', loadChildren: './tabs/rewards/levels/levels.module#LevelsPageModule' },
  { path: 'conditions', loadChildren: './tabs/policy/conditions/conditions.module#ConditionsPageModule' },
  // status pages
  { path: 'status', loadChildren: './tabs/status/status.module#StatusPageModule' },
  // sos pages
  { path: 'confirm-phone', loadChildren: './tabs/sos/confirm-phone/confirm-phone.module#ConfirmPhonePageModule' },
  { path: 'report-success', loadChildren: './tabs/sos/report-success/report-success.module#ReportSuccessPageModule' },
  { path: 'confirm-location', loadChildren: './tabs/sos/confirm-location/confirm-location.module#ConfirmLocationPageModule' },
  // car pages
  { path: 'cars', loadChildren: './tabs/cars/cars.module#CarsPageModule' },
  { path: 'car-detail', loadChildren: './tabs/cars/car-detail/car-detail.module#CarDetailPageModule' },
  { path: 'add-driver', loadChildren: './tabs/cars/add-driver/add-driver.module#AddDriverPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
