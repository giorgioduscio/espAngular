import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import validation from './validation';
import { randomNumber, randomImage } from '../../tools/randomCompiler';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NavbarComponent, ReactiveFormsModule, FormsModule, RouterModule, NgIf, NgFor, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor( private usersService :UsersService, private router :Router){
    document.title="Login"
    this.voidForm()
  }

  // todo MOSTRA GLI USERS
  users :User[] =[]
  keys :string[] =[]
  form! :FormGroup<any>
  template :any[] =[]
  voidForm(){
    const {templateForm, controller} =validation()
    this.form =new FormGroup(controller)
    this.template =templateForm
  }

  //TODO AGGIUNGE UN USER
  onSubmit() {
    const input :User ={
      id: 0,
      email: '',
      username: '',
      password: '',
      imageUrl: '',
      role: 0,
      ...this.form.value,
    }
    this.usersService.addUser({
      id: randomNumber(999999999),
      username: input.username,
      email: input.email,
      imageUrl: randomImage(),
      password: input.password,
      role: Number(input.role),
    })
    this.voidForm()    
    this.router.navigate(['/access'])
  }



}