import { Component, effect, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../auth/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { controller, templateForm } from './validation';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './access.component.html',
  styleUrl: './login.component.css'
})
export class AccessComponent {
  users :User[] =[]
  showcomponent =signal({error:false, password:false})
  form =new FormGroup({ password:controller.password, email:controller.email })
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
    const user =this.users .find(user=>
      user.email===this.form.value.email &&
      user.password===this.form.value.password
    )

    if(user !==undefined){
      this.authService.verifyLocalUser(user.id)
      this.router.navigate( ['/home'], { relativeTo: this.activatedRoute } )
      this.showcomponent().error =false
    }else{
      this.showcomponent().error =true
    }
  }
}
