import { Component, effect, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ RouterModule, MatIconModule, ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  localeUser :User |undefined =undefined

  constructor(private authService:AuthService){
    effect(()=>{
      this.localeUser =authService.user()
    })
  }
  //todo RESET
  onResetLocalUser =()=> this.authService.resetLocalUser() 
}