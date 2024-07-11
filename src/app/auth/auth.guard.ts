import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn =(route, state) =>{
  return (
    inject(AuthService).isAuthenticated()
    // inject(AuthService).isRuoleAdmin()
  )
};