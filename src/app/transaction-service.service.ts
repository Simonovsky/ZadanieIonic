import { Injectable } from '@angular/core';
import { User } from './User';
import { Transaction } from './Transaction';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  mUser:User;
  mTransactions : Transaction[] = new Array();
  mNewTransaction: Transaction = new Transaction();

  constructor(private storage: Storage) {

  }

  public async fetchTransactions(): Promise<Transaction[]>{
    this.mTransactions = JSON.parse(await this.storage.get("transactions"));
    return this.mTransactions;
  }

  private async addToStorage(key:string, data:any){
    await this.storage.set(key, JSON.stringify(data));
    return;
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

  
  public async  createTransaction( senderId: number,recieverId: number,amount: number,type: string,message: string,timestamp: number, inUser:User): Promise<Transaction[]> {
    await this.fetchTransactions().then(() => {

      this.mNewTransaction = new Transaction();

      this.mNewTransaction.transactionId = this.getNewTransactionId();
      this.mNewTransaction.senderId = senderId;
      this.mNewTransaction.recieverId = recieverId;
      this.mNewTransaction.amount = amount;
      this.mNewTransaction.type = type;
      this.mNewTransaction.message = message;
      this.mNewTransaction.timestamp = timestamp;
      this.mNewTransaction.accountBalanceBeforeTransaction = inUser.userBalance;

      //This distinguishes between sending and recieving money
      if(recieverId === inUser.userId) {
        this.mNewTransaction.accountBalanceAfterTransaction = inUser.userBalance + amount;
      } else if(senderId === inUser.userId) {
        this.mNewTransaction.accountBalanceAfterTransaction = inUser.userBalance - amount;
      }
      inUser.userBalance = this.mNewTransaction.accountBalanceAfterTransaction;

      this.mTransactions.push(this.mNewTransaction);

      
    });
    await this.addToStorage("transactions", this.mTransactions);
    await this.addToStorage("user", inUser);
    return this.mTransactions;
  }


  public async createTransactionsFromArr(inTransactions:Transaction[], inUser:User): Promise<Transaction[]>{
    this.mTransactions = new Array();
    inTransactions.forEach(tr => {
        
        tr.accountBalanceBeforeTransaction = inUser.userBalance;

        //This distinguishes between sending and recieving money
        if(tr.recieverId == inUser.userId) {
          tr.accountBalanceAfterTransaction = inUser.userBalance + tr.amount;
          inUser.userBalance = tr.accountBalanceAfterTransaction;

        } else if(tr.senderId == inUser.userId) {
          tr.accountBalanceAfterTransaction = inUser.userBalance - tr.amount;
          inUser.userBalance = tr.accountBalanceAfterTransaction;

        }
        
        this.mTransactions.push(tr);
        console.log(inUser.userBalance);
      
    });

    await this.addToStorage("transactions", this.mTransactions);
    await this.addToStorage("user", inUser);
    return this.mTransactions;
  }

}
