import { effect, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { delay, of } from 'rxjs';

@Injectable({  providedIn: 'root' })
export class AuthService {
  user =signal<User |undefined>(undefined)
  constructor(private usersService:UsersService){
    effect(()=>{
      this.setByStorage()
    }, {allowSignalWrites:true})
  }

  // QUANDO SI CARICA LA PAGINA SE TROVA 
  setByStorage(){
    let exist =localStorage.getItem('userId')
    let userId =exist ?Number(exist) :null
    // ID TROVATO
    if(userId){
      let match =this.usersService.users().find(u=> u.id ===userId)
      this.user.set(match)
      return of(JSON.parse(userId.toString())).pipe(delay(0)) 
    }
    // ID NON TROVATO
    return of(undefined);
  }

  // CONTROLLA EMAIL E PASSWORD DI UN USER PASSATO
  verifyLocalUser(userToVerify:User){
    // controlla credenziali
    let match =this.usersService.users().find(u=>
      u.email ===userToVerify.email &&
      u.password ===userToVerify.password
    )
    // aggiorna l'utente
    if (match){
      this.user.set(match)
      localStorage.setItem('userId', match.id.toString())
      return true

    }else return false
  }

  resetLocalUser(){
    this.user.set(undefined)
    localStorage.removeItem('userId')
    location.reload()
  }
}
