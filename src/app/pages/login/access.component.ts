import { Component, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgIf } from '@angular/common';
import validation from './validation';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, NavbarComponent, NgIf],
  templateUrl: './access.component.html',
  styleUrl: './login.component.css'
})
export class AccessComponent {
  constructor(private router: Router, private authService:AuthService, ){
    document.title ='Access'
    this.voidForm()
  }

  showcomponent =signal({error:false, password:false})
  form! :FormGroup<any>
  template :any[] =[]
  voidForm(){
    const {templateForm, controller} =validation()
    const newController ={ password:controller['password'], email:controller['email'] }    
    this.form =new FormGroup(newController)
    this.template =templateForm.filter(f=>f.key==='password'||f.key==='email')
  }

  // TODO SUBMIT
  onSubmit(){
    const userToVerify :User ={
      id: 0,
      email: this.form.value.email,
      username: '',
      password: this.form.value.password,
      imageUrl: '',
      role: 0,
    }
    // SE VI E' UN RISCONTRO DELL'UTENTE
    if(this.authService.verifyLocalUser(userToVerify)){ 
      let userKey =this.authService.user()?.key
      this.router.navigate(['/user/'+userKey])
      this.voidForm()
    }else console.log('le credenziali non hanno riscontrato risultati')
  }
}
