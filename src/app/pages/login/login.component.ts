import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { controller, templateForm } from './validation';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent, ReactiveFormsModule, FormsModule, RouterModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  users :User[] =[]
  keys :string[] =[]
  form =new FormGroup({...controller})
  template =[...templateForm]

  // todo MOSTRA GLI USERS
  constructor( private usersService :UsersService, private activatedRoute :ActivatedRoute, private router :Router){
    document.title="Login"
    // console.log(this.form, this.template)
  }

  //TODO AGGIUNGE UN USER
  onSubmit() {
    const input :User =this.form.value
    this.usersService.addUser({
      id: randomId(),
      username: input.username,
      email: input.email,
      imageUrl: randomImage(),
      password: input.password,
      role: input.role,
    })
    this.router.navigate(['/access'])
  }



}