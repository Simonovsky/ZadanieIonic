import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserTransaction } from '../UserTransaction';
import { User } from '../User';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  mTransactions: UserTransaction[] = new Array();
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

  getNewTransactionId(){
    let ID = 0;
    this.mTransactions.forEach(transaction => {
      if(transaction.transactionId > ID){
        ID = transaction.transactionId;
      }
    });
    return ID + 1;
  }

  sendButtonOnClick(){
    let trID = this.getNewTransactionId();
    let sendID = this.mUser.userId;
    console.log("Send new transaction btn clicked! transaction id: "+ trID);

    if(this.RecieverId !== null && this.Amount !== null && this.Type !== null && this.Message !== null){
      this.mTransactions.push(new UserTransaction().createTransaction(trID, sendID, this.RecieverId, this.Amount, this.Type, this.Message, Date.now()));
      this.storage.set("transactions", JSON.stringify(this.mTransactions));

      this.mUser.userBalance = this.mUser.userBalance - this.Amount;
      this.storage.set("user", JSON.stringify(this.mUser));

      this.presentToast("Transaction recieved by the bank.");
      this.navController.navigateRoot("/tabs/tab1");

    }else{
      
      this.presentToast("All of these fields must be filled in order to create transaction !")
    }
  }


  async presentToast(toastMsg:string) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 2000
    });
    toast.present();
  }
  

}
