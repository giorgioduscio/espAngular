import { Component, effect, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../../auth/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, MatIcon, RouterModule, NavbarComponent],
  templateUrl: './access.component.html',
  styleUrl: '../login.component.css'
})
export class AccessComponent {
  users :User[] =[]
  showcomponent =signal({error:false,password:false})
  constructor(
    private usersService:UsersService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService:AuthService,
  ){
    document.title ='Access'
    this.usersService.getUsers()
    effect(()=>{
      this.users =this.usersService.users()
    })
  }

  // TODO SUBMIT
  onSubmit(form:NgForm){
    const user :User =this.users .filter(user=>
      user.email===form.value.email &&
      user.password===form.value.password
    )[0]
    if(user !==undefined){
      this.authService.verifyLocalUser(user)
      this.router.navigate( ['/Home'], { relativeTo: this.activatedRoute } )
      this.showcomponent().error =false
    }else{
      this.showcomponent().error =true
    }
  }
}
