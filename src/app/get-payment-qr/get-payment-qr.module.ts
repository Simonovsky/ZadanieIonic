import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetPaymentQrPageRoutingModule } from './get-payment-qr-routing.module';

import { GetPaymentQrPage } from './get-payment-qr.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetPaymentQrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GetPaymentQrPage]
})
export class GetPaymentQrPageModule {}
