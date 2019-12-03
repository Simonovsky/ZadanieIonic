import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserTransaction } from '../UserTransaction';
import { User } from '../User';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mTransactions: UserTransaction[] = new Array();
  mUser: User = new User();

  constructor(private storage: Storage, private navController: NavController) {

    this.storage.get('user').then((val) => {
        this.mUser = JSON.parse(val);  
    });

    this.storage.get('transactions').then((val) => {
      this.mTransactions = JSON.parse(val);

      this.mTransactions.forEach(transaction => {
        if  (transaction.recieverId !== this.mUser.userId && transaction.senderId !== this.mUser.userId){
          this.mTransactions.splice(transaction.transactionId, 1);
        }
      });

    });
  }

  ionViewDidEnter() {
    this.refreshOnClick();
  }


  refreshOnClick(){
     this.storage.get('user').then((val) => {
        this.mUser = JSON.parse(val);  
    });
    this.storage.get('transactions').then((val) => {
      this.mTransactions = JSON.parse(val);

      this.mTransactions.forEach(transaction => {
        if  (transaction.recieverId !== this.mUser.userId && transaction.senderId !== this.mUser.userId){
          this.mTransactions.splice(transaction.transactionId, 1);
        }
      });
    });
  }

  transactionOnClick(inTransaction: UserTransaction){
    console.log(inTransaction);

    this.storage.set("selected-transaction", JSON.stringify(inTransaction));
    this.navController.navigateRoot("transaction-detail");
  }
}

