import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { controller, templateForm } from './validation';
import { randomId, randomImage } from '../../tools/randomCompiler';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent, ReactiveFormsModule, FormsModule, RouterModule, NgIf, NgFor, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  users :User[] =[]
  keys :string[] =[]
  form =new FormGroup({...controller})
  template =[...templateForm]
  

  // todo MOSTRA GLI USERS
  constructor( private usersService :UsersService, private router :Router){
    document.title="Login"
    // console.log(this.form, this.template)
  }

  //TODO AGGIUNGE UN USER
  onSubmit() {
    const input :User ={
      ...this.form.value,
      id: 0,
      email: '',
      username: '',
      password: '',
      imageUrl: '',
      role: 0
    }
    this.usersService.addUser({
      id: randomId(),
      username: input.username,
      email: input.email,
      imageUrl: randomImage(),
      password: input.password,
      role: Number(input.role),
    })
    this.form.reset()
    this.router.navigate(['/access'])
  }



}