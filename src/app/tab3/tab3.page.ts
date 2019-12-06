import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../Transaction';
import { User } from '../User';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TransactionServiceService } from '../transaction-service.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mTransactionService = new TransactionServiceService(this.storage);
  mTransactions: Transaction[] = new Array();
  mUser: User = new User();

  RecieverId:number = null;
  Amount:number = null;
  Type:string = null;
  Message:string = null;

  constructor(private storage: Storage, private toastController: ToastController, private navController: NavController) {

    this.storage.get('user').then((val) => {
      this.mUser = JSON.parse(val);
    });

    this.storage.get('transactions').then((val) => {
      this.mTransactions = JSON.parse(val);
    });
  }


  sendButtonOnClick(){
    let sendID = this.mUser.userId;
    console.log("Send new transaction btn clicked! transaction ");

    if(this.RecieverId !== null && this.Amount !== null && this.Type !== null && this.Message !== null){

      //checks funds
      if(this.mUser.userBalance >= this.Amount ){
        this.mTransactionService.createTransaction(sendID, this.RecieverId, this.Amount, this.Type, this.Message, Date.now(), this.mUser).then(()=>{        
          this.presentToast("Transaction recieved by the bank.");
          this.navController.navigateRoot("/tabs");
        });
      }else{
        this.presentToast("Insufficient funds!!!");
      }
  
    }else{
      
      this.presentToast("All of these fields must be filled in order to create transaction !")
    }
  }


  qrOnClick(){
    this.navController.navigateRoot("/get-payment-qr");

  }

  async presentToast(toastMsg:string) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }
  

}
