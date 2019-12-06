import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetPaymentQrPage } from './get-payment-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GetPaymentQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetPaymentQrPageRoutingModule {}
