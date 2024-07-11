import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn =true
  isAdmin =false

  isAuthenticated(){return this.isLoggedIn}
  isRuoleAdmin(){return this.isAdmin}
}
