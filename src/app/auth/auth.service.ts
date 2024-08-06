import { Injectable, signal, WritableSignal } from '@angular/core';
import { SelectRole, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  localUser :WritableSignal<User |undefined> =signal(undefined)
  isLoggedIn =signal(false)
  isAdmin =signal(false)

  verifyLocalUser(userToVerify:User){
    //FIX ERRORE
    if (userToVerify===undefined){
      return "Password o email errata"
    } 
    //TODO AUTENTICATO
    else {
      this.localUser.set(userToVerify)
      this.isLoggedIn.set(true)
      if (userToVerify.role===SelectRole.ADMIN) this.isAdmin.set(true)
      return this.localUser
    }
  }
  resetLocalUser(){
    this.localUser.set(undefined)
    this.isLoggedIn.set(false)
    this.isAdmin.set(false)
  }

  isAuthenticated(){return this.isLoggedIn()}
  isRuoleAdmin(){return this.isAdmin()}
}
