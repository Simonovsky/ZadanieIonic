import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {


  mUser: User = new User();
  constructor(private storage: Storage, private navController: NavController) {}

ngOnInit() {
      this.storage.get('user').then((val) => {
      this.mUser = JSON.parse(val); }
      );
  }

  editUserSaveBtnOnClick() {
    console.log(this.mUser.userName);
    this.storage.set("user", JSON.stringify(this.mUser));
    this.navController.navigateRoot("");
  }

}
