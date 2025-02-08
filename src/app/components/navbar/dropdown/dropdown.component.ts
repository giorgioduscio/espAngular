import { Component } from '@angular/core';
import { smartRoutes } from '../../../app.routes';
import { RouterLink } from '@angular/router';

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
    @for (page of routerClone; track $index){
      <li><a class="dropdown-item" 
        routerLink="/{{page.path}}"
        >{{ page.path }}
      </a></li>
    }
    </ul>
  </li>
  `,
})
export class DropdownComponent {
  // COPIA ROUTER
  routerClone =smartRoutes.filter(p=>p.show)
  constructor(){
    // console.log(this.routerClone);
    
  }
}
