import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../Transaction';
import { User } from '../User';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TransactionServiceService } from '../transaction-service.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mTransactionService = new TransactionServiceService(this.storage);
  mTransactions: Transaction[] = new Array();
  mUser: User = new User();

  mNewTransaction:Transaction = new Transaction();
  RecieverId:number = this.mNewTransaction.recieverId;
  Amount:number = this.mNewTransaction.amount;
  Type:string = this.mNewTransaction.type;
  Message:string = this.mNewTransaction.message;

  constructor(private storage: Storage, private toastController: ToastController, private navController: NavController, private barcodeScanner: BarcodeScanner) {

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

  scan() {
    this.barcodeScanner.scan().then(data => {
        // this is called when a barcode is found
        const mTr:Transaction = JSON.parse(data.text.toString());

        this.RecieverId =mTr.recieverId;
        this.Amount = mTr.amount;
        this.Type = mTr.type;
        this.Message = mTr.message;

        console.log(data.text);
      });      
  }

  async presentToast(toastMsg:string) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }
  

}
