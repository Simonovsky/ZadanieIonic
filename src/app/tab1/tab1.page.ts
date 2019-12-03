import { Component } from '@angular/core';
import { User } from '../User';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { EditUserPageModule } from '../edit-user/edit-user.module';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  mUser:User = new User();
  

  constructor(private storage: Storage, private navController: NavController) {
    storage.get('user').then((val) => {
      this.mUser = JSON.parse(val); }
      );
  }

  editUserBtnOnClick() {
    this.navController.navigateRoot("edit-user");
  }

  
  ionViewDidEnter() {
    this.refreshOnClick();
  }

  refreshOnClick(){
    this.storage.get('user').then((val) => {
      this.mUser = JSON.parse(val); }
      );
  }

}
