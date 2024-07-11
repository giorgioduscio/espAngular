import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn =() =>{
  // return inject(AuthService).isAuthenticated();
  return inject(AuthService).isRuoleAdmin();
};