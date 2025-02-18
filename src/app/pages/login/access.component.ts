import { Component, effect, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { controller, templateForm } from './validation';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, NavbarComponent, NgIf],
  templateUrl: './access.component.html',
  styleUrl: './login.component.css'
})
export class AccessComponent {
  users :User[] =[]
  showcomponent =signal({error:false, password:false})
  form =new FormGroup({ password:controller['password'], email:controller['email'] })
  template =templateForm .filter(f=>f.key==='password'||f.key==='email')

  constructor(private usersService:UsersService, private activatedRoute: ActivatedRoute, private router: Router, private authService:AuthService, ){
    document.title ='Access'
    this.usersService.getUsers()
    effect(()=>{
      this.users =this.usersService.users()
    })
  }

  // TODO SUBMIT
  onSubmit(){
    let userToVerify :User ={
      id: 0,
      email: this.form.value.email,
      username: '',
      password: this.form.value.password,
      imageUrl: '',
      role: 0
    }
    if(this.authService.verifyLocalUser(userToVerify)) this.router.navigate(['/home'])
    else console.log('le credenziali non hanno riscontrato risultati');
  }
}
