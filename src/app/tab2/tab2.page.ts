import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../Transaction';
import { User } from '../User';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../user-service.service';
import { TransactionServiceService } from '../transaction-service.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mTransactions: Transaction[] = new Array();
  mUser: User = new User();

  constructor(private storage: Storage, private navController: NavController) {

    this.storage.get('user').then((val) => {
        this.mUser = JSON.parse(val);  
    });
  }

  
  
  ionViewDidEnter(){
    this.refreshOnClick();
  }


  refreshOnClick(){
     this.storage.get('user').then((val) => {
        this.mUser = JSON.parse(val);  
    });
    this.storage.get('transactions').then((val) => {
      this.mTransactions = JSON.parse(val);

      this.mTransactions.forEach(transaction => {
        console.log(transaction);
        if(transaction !== null){
          if  (transaction.recieverId !== this.mUser.userId && transaction.senderId !== this.mUser.userId){
            this.mTransactions.splice(transaction.transactionId, 1);
          }
        }else{
          this.mTransactions.splice(transaction.transactionId, 1);
        }
      });
    });
  }

  transactionOnClick(inTransaction: Transaction){
    console.log(inTransaction);

    this.storage.set("selected-transaction", JSON.stringify(inTransaction));
    this.navController.navigateRoot("transaction-detail");
  }

  statsOnClick(){
    this.navController.navigateRoot("stats");
  }
}

