import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  users :User[] =[]
  gettedId =Number(localStorage.getItem('userId'))

  accesserUser =signal<User |undefined>(undefined)
  accessContitiones =signal({ isLogged:false, isAdmin:false })
  constructor(private usersService:UsersService){
    usersService.getUsers()
    effect(()=>{ 
      this.users =usersService.users() 
      this.gettedId =Number(localStorage.getItem('userId'))
      // console.log(this.users);
    })
    setTimeout(()=>{
      // console.log('auto access');
      this.verifyLocalUser( this.gettedId )
    }, 1000);
  }

  verifyLocalUser(userId:number){
    const userToVerify =this.users .filter(user=>user.id===userId)[0]
    
    if (userToVerify!==undefined) {
      this.accesserUser.set(userToVerify)
      localStorage.setItem('userId',`${userId}`)
      this.accessContitiones().isLogged =true
      // if (userToVerify.role===SelectRole.ADMIN) this.isAdmin.set(true)
      return this.accesserUser
    }else{ return 'Error' }
  }
  resetLocalUser(){
    this.accesserUser.set(undefined)
    localStorage.removeItem('userId')
    this.accessContitiones.set({ isLogged:false, isAdmin:false })
    // console.log(this.accesserUser(),this.accessContitiones());
  }

  isAuthenticated(){return this.accessContitiones().isLogged}
  isRuoleAdmin(){return this.accessContitiones().isAdmin}
}
