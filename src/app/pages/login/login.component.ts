import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { randomId, randomImage } from '../chat/autocomp';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

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
    this.router.navigate( ['/access'], { relativeTo: this.activatedRoute } )
  }



}