import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { smartRoutes } from '../app.routes';
/* 
  PREMESSA: da utilizzare solo nelle pagine che richiedono 
  AUTORIZZAZIONE auth:[0, 2] O AUTENTICAZIONE auth:[]
  non bisogna utilizzarla su tutte le pagine
  
  SICUREZZA: se qualcuno scrive 0 nel local storage, ottiene i privilegi da admin
*/
export const authGuard: CanActivateFn =(route, state) =>{
  const authService = inject(AuthService);

  // cerca i ruoli richiesti dalla pagina
  const pageTitle =state.url.substring(1)
  const requestedRoles =smartRoutes.find(route=>route.path===pageTitle)?.auth

  // prende il ruolo dal local storage
  const exixt =localStorage.getItem('userRole')
  const userRole =exixt ?Number(exixt) :null
  

  // NON ESISTE ALCUN UTENTE
  if(userRole===null) return false
  else{
    // RICHIESTA AUTORIZZAZIONE
    if(requestedRoles?.length){
      let match =requestedRoles.some(roleId=> roleId===userRole)
      return match

    // RICHIESTA SOLO AUTENTICAZIONE
    }else return true
  }
};