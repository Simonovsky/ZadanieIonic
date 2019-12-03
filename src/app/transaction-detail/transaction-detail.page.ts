import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { UserTransaction } from '../UserTransaction';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {

  mTransaction: UserTransaction;
  mTranDateIsoString:string;

  constructor(private storage: Storage, private navController: NavController) {
    this.refresh();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.refresh();
  }

  async refresh(){
    await this.storage.get("selected-transaction").then((val) => {
      this.mTransaction = JSON.parse(val);
      this.mTranDateIsoString = new Date(this.mTransaction.timestamp).toISOString();
      console.log(this.mTransaction);
    });
  }

  backOnClick(){
    this.navController.back();
  }

}
