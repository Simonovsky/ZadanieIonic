import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {


  mUser: User = new User();
  constructor(private storage: Storage, private navController: NavController,private toastController: ToastController) {}

ngOnInit() {
      this.storage.get('user').then((val) => {
      this.mUser = JSON.parse(val); }
      );
  }

  editUserSaveBtnOnClick() {
    if(this.mUser.userName.match("^[a-zA-Z]+$") && this.mUser.userSurname.match("^[a-zA-Z]*$")){
      this.mUser.userPhone.replace("\s", '');
      console.log(this.mUser.userPhone.slice(0,4))
      if(this.mUser.userPhone.slice(0,4) === "+421" || this.mUser.userPhone.slice(0,2) === "09"){
        if(this.mUser.userPhone.length >= 10 && this.mUser.userPhone.length <= 13){
          console.log(this.mUser.userName);
          this.storage.set("user", JSON.stringify(this.mUser));
          this.navController.navigateRoot("");
        }else{
          this.presentToast("Phone number lenght is not correct!");
        }       
      }else{
        this.presentToast("Phone number must start with 09 of +421!");
      }   
    }else{
      this.presentToast("Name and Surname can't contain non alphabetical characters!");
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
