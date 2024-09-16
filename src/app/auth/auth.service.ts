import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  localUser =signal<User |undefined>(undefined)
  accessContitiones =signal({ isLogged:false, isAdmin:false })

  verifyLocalUser(userToVerify:User){
    //FIX ERRORE
    if (userToVerify===undefined){
      return "Password o email errata"
     
    //TODO AUTENTICATO
    }else {
      this.localUser.set(userToVerify)
      this.accessContitiones().isLogged =true
      // if (userToVerify.role===SelectRole.ADMIN) this.isAdmin.set(true)
      return this.localUser
    }
  }
  resetLocalUser(){
    this.localUser.set(undefined)
    this.accessContitiones.set({ isLogged:false, isAdmin:false })
    // console.log(this.localUser(),this.accessContitiones());
  }

  isAuthenticated(){return this.accessContitiones().isLogged}
  isRuoleAdmin(){return this.accessContitiones().isAdmin}
}
