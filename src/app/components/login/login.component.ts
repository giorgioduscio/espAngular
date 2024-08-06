import { Component, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SelectRole, User } from '../../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { randomId, randomImage } from '../chat/autocomp';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  users! :User[]
  keys! :string[]
  roles :string[] =Object.keys(SelectRole) .filter(key=>key.length>1)
  loginMode =signal(true)

  // todo MOSTRA GLI USERS
  constructor(private usersServices:UsersService, private authService:AuthService){
    document.title="Login"
    usersServices.getUsers().subscribe((responce:any)=>{
      this.users =Object.keys(responce) .map(key=>{
        return responce[key]
      })
      // console.log('users', this.users);
    })
  }

  //todo FORM
  onSubmit(form:NgForm) {
    const 
      input :User =form.value,
      newUser :User ={
        id: randomId(),
        username: input.username,
        email: input.email,
        role: input.role,
        imageUrl: randomImage()
      }
    // AGGIUNGE UN USER
    if (this.loginMode()) {
      this.usersServices.addUser(newUser)
      .subscribe(responce=> console.log("Iscrizione", responce))
    } 
    // CONTROLLO AUTENTICITA
    else {
      const result :User =this.users.filter(user =>user.email===newUser.email && user.username===newUser.username)[0]
      this.authService.verifyLocalUser(result)
      console.log("Accesso",
        `autenticato: ${this.authService.isLoggedIn()}, admin: ${this.authService.isAdmin()}`
      );
    }
    form.reset()
  }
}
