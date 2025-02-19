import { Component, effect } from '@angular/core';
import { smartRoutes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { SmartRoute } from '../../../tools/buildSmartRouter';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ RouterLink, ],
  
  template:`
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" 
      data-bs-toggle="dropdown" aria-expanded="false">
      Pagine
    </a>
    <ul class="dropdown-menu">
    @for (page of pages; track $index){
      <li>
        <a class="dropdown-item" routerLink="/{{page.path}}">{{ page.path }}</a>
      </li>
    }
    </ul>
  </li>
  `,
})
export class RoutesComponent {
  constructor(public authService:AuthService){
    effect(()=>{
      this.setPages()
    })
  }

  // MOSTRA LE ROTTE SOLO SE L'UTENTE VI PUO' ACCEDERE
  pages :SmartRoute[] =[]
  setPages(){
    let userRole =this.authService.user()?.role
    // SE L'UTENTE NON ESISTE MOSTRA SOLO PAGINE LIBERE
    if(userRole===undefined) this.pages =smartRoutes
      .filter(page=> page.show &&page.auth===undefined);
    // SE L'UTENTE HA UN RUOLO, MOSTRA LE PAGINE ACCESSIBILI 
    else this.pages =smartRoutes .filter(page=> 
      // pagine libere
      (page.show &&page.auth===undefined) ||  
      // pagine auth:[]
      (page.show &&page.auth?.length===0) ||  
      // pagine auth[i]==ruolo
      (page.show &&page.auth?.some(role=> role===userRole)) 
    );
  }
}
