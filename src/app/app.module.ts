import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { User } from './User';

import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { Transaction } from './Transaction';
import { UserServiceService } from './user-service.service';
import { TransactionServiceService } from './transaction-service.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgxQRCodeModule, BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
driverOrder: [ 'sqlite', 'indexeddb', 'websql']
    }),
     AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  mUser:User = new User();
  mTransactions : Transaction[] = new Array();

  mUserService = new UserServiceService(this.storage);
  mTransactionService = new TransactionServiceService(this.storage);


  constructor(private storage: Storage){
    this.createUser();
  }


  createTransactions(){
    this.mTransactionService.fetchTransactions().then(trans => {
      this.mTransactions = trans;
      // only if there are no tr's in db

      if(trans == null){
        console.log("loaded transactions = null creating new ");

        this.mTransactions = new Array(
          new Transaction().createTransaction(0, 0, 1, 100, "edu", "school", 1572566400),
          new Transaction().createTransaction(1, 2, 0, 500, "faktura", "whatever", 1572706800),
          new Transaction().createTransaction(2, 0, 3, 54, "bar", "jhg", 1572670800),
          new Transaction().createTransaction(3, 1, 3, 52, "basr", "", 1572670800)
        );
          
        console.log("IN",this.mTransactions);
          
        this.mTransactionService.createTransactionsFromArr(this.mTransactions, this.mUser).then(transactions => {
          this.mTransactions = transactions;
        });
      }else{
        console.log("loaded transactions lenght = "+trans.length.toString);
      }
    });

   
  }

  createUser(){
    this.mUserService.fetchUser().then(usr => {
      if(usr == null){
        console.log("No user fetched creating new");
        this.mUserService.createUser(0,'Simon','Kolejak',15200,'Adresa 3','0915159615','simon.kolejak@sajhdsb.sa').then(user =>{
         console.log(user);
         this.mUser = user;
         this.createTransactions();
       });
      }else{
        this.mUser = usr;
        console.log("User fetched! User: " ,this.mUser );

      }
    })
    
  }
}
