import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { routes } from './../../app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
  ],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  dropdown =false

  logged =true

  private R:any =routes;
  // console.log("router", R)
}

console.log("router", routes)