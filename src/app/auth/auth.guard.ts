import { effect, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { smartRoutes } from '../app.routes';
import { of, map, take } from 'rxjs';
/* 
  PREMESSA: da utilizzare solo nelle pagine che richiedono 
  AUTORIZZAZIONE auth:[0, 2] O AUTENTICAZIONE auth:[]
  non bisogna utilizzarla su tutte le pagine
*/
export const authGuard: CanActivateFn =(route, state) =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  const thisPage =state.url.substring(1)
  const authSettings =smartRoutes.find(route=>route.path===thisPage)?.auth

  
  // VERIFICA CREDENZIALI
  function verify() {
    // RICHIESTA AUTORIZZAZIONE
    if(authSettings?.length){
      let match =authSettings.some(roleId=> roleId===authService.user()?.role)
      if (match) return of(!!authService.user())
      else return of(false)
    }
    // RICHIESTA SOLO AUTENTICAZIONE
    return of(!!authService.user())
  }
  
  function checkAuthStatus(){
    // LOGIN GIA' ESEGUITO
    if(authService.user()) return verify()
    // GESTIONE DEL REFRESH
    return authService.setByStorage().pipe(
      map(userId =>{
        console.log('refresh userid', userId);
        return userId!==undefined
      })
    )
  }

  return checkAuthStatus().pipe(
    take(1),
    map(canActivate=>canActivate)
  );
};