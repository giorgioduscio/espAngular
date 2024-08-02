import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SelectRole, User } from '../../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { randomId } from '../chat/autocomp';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users! :User[] |any
  keys! :string[]
  constructor(private usersServices:UsersService){
    document.title="Login"
    this.users =usersServices.getUsers()
    this.keys =Object.keys(this.users[0])
    console.log('users', this.roles);
  }

  roles :string[] =Object.keys(SelectRole) .filter(key=>key.length>1)
  onSubmit(form:NgForm) {
    const 
      formValue :User =form.value,
      newUser :User ={
        id: randomId(),
        username: formValue.username,
        email: formValue.email,
        role: formValue.role,
        imageUrl: formValue.imageUrl
      }
    this.usersServices.addUser(newUser)
    form.reset()
    console.log(formValue, this.users);
  }
}
