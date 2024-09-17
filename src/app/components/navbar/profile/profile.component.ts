import { Component, effect, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { closeDropdown } from '../closeDropdown';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ NgIf,RouterModule, MatIconModule, ],
  templateUrl: './profile.component.html',
  styleUrl: '../dropdown/dropdown.component.css'
})
export class ProfileComponent {
  localeUser :User |undefined =undefined

  constructor(private authService:AuthService){
    effect(()=>{
      this.localeUser =authService.accesserUser()
    })
    closeDropdown("profileDropdown")
  }
  //todo RESET
  onResetLocalUser(){ this.authService.resetLocalUser() }
}