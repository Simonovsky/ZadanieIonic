import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { Transaction } from '../Transaction';
import { Chart } from 'chart.js';
import { User } from '../User';
import { UserServiceService } from '../user-service.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { delay } from 'q';


@Component({
  selector: 'app-get-payment-qr',
  templateUrl: './get-payment-qr.page.html',
  styleUrls: ['./get-payment-qr.page.scss'],
})
export class GetPaymentQrPage implements OnInit {

  elementType = 'url';
  value = 'Techiediaries';

  mTransaction = new Transaction();
  mTransactionJson = "";
  

  mUser = new User();
  mUserService = new UserServiceService(this.storage);

  constructor(private storage:Storage, private navController:NavController, private toastController:ToastController) {
    this.mUserService.fetchUser().then(usr => {
      this.mUser = usr;
      this.mTransaction.recieverId = this.mUser.userId;
    });
  }

  async generateQr(){
    if( this.mTransaction.amount != null && this.mTransaction.type != null){
      this.mTransactionJson= JSON.stringify(this.mTransaction);
    }else{
      this.presentToast("Fields amount and type must be filled!");
    }
  }


  ngOnInit() {
  }

  
  async presentToast(toastMsg:string) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }


  backOnClick(){
    this.navController.back();
  }
}
