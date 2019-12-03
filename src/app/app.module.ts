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
import { UserTransaction } from './UserTransaction';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
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
  mTransactions : UserTransaction[] = new Array();


  constructor(private storage: Storage){
    this.createUser();
    this.createTransactions();
  }


  createTransactions(){
    this.mTransactions.push(
      new UserTransaction().createTransaction(0, 0, 1, 100, "edu", "school", 1572566400),
      new UserTransaction().createTransaction(1, 2, 0, 500, "faktura", "whatever", 1572706800),
      new UserTransaction().createTransaction(2, 0, 3, 52, "bar", "", 1572670800),
      new UserTransaction().createTransaction(3, 1, 3, 52, "basr", "", 1572670800)
    );

    this.storage.set("transactions", JSON.stringify(this.mTransactions));

    this.storage.get('transactions').then((val) => {
      console.log('Your json is', val);
      let usr = new Array(UserTransaction);
      usr = JSON.parse(val);
      console.log(usr);
    });

  }


  createUser(){
    this.mUser.userId = 0;
    this.mUser.userName = 'Simon';
    this.mUser.userSurname = 'Kolejak';
    this.mUser.userBalance = 15200;
    this.mUser.userAddress = 'Adresa 3';
    this.mUser.userPhone = '0915159615';
    this.mUser.userEmail = 'simon.kolejak@sajhdsb.sa';

    this.storage.set("user", JSON.stringify(this.mUser));

    this.mUser = new User();

    this.storage.get('user').then((val) => {
      console.log('Your json is', val);
      let usr = new User();
      usr = JSON.parse(val);
      console.log(usr);
    });

    console.log(this.mUser);
  }
}
