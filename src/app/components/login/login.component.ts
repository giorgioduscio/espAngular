import { Component, effect, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SelectRole, User } from '../../interfaces/user';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { randomId, randomImage } from '../chat/autocomp';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent, NgFor, NgIf, ReactiveFormsModule, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  users :User[] =[]
  keys :string[] =[]

  // todo MOSTRA GLI USERS
  constructor(
    private usersService :UsersService,
    private activatedRoute :ActivatedRoute, 
    private router :Router
  ){
    document.title="Login"
  }

  //TODO AGGIUNGE UN USER
  onSubmit(form:NgForm) {
    const input :User =form.value
    this.usersService.addUser({
      id: randomId(),
      username: input.username,
      email: input.email,
      imageUrl: randomImage(),
      password: input.password
    })
    this.router.navigate( ['/Access'], { relativeTo: this.activatedRoute } )
  }



}