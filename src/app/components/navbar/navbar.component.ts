import { Component, Input, OnInit, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { routes } from './../../app.routes';
import { AuthService } from '../../service/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  routerClone =routes
  constructor( private authService :AuthService ){
    // console.log(`this.routerClone`, this.routerClone);
    
  }


  @Input() title:any

}