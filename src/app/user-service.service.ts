import { Injectable } from '@angular/core';
import { User } from './User';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  mUser:User = new User();

  constructor(private storage:Storage) {

  }
  private async addToStorage(key:string, data:any){
    await this.storage.set(key, JSON.stringify(data));
    return;
  }
  
  public createUser(userId: number,
    userName: string,
    userSurname: string,
    userBalance: number,
    userAddress: string,
    userPhone: string,
    userEmail: string) :Promise<User> {
      this.mUser = new User();
      this.mUser.userId = userId;
      this.mUser.userName = userName;
      this.mUser.userSurname = userSurname;
      this.mUser.userBalance = userBalance;
      this.mUser.userAddress = userAddress;
      this.mUser.userPhone = userPhone;
      this.mUser.userEmail = userEmail;

      return this.addToStorage("user", this.mUser).then(() => {
        return this.mUser;
      });
  }

  public async fetchUser() : Promise<User> {
    this.mUser = await JSON.parse(await this.storage.get("user"));
    return this.mUser;
  }
}
