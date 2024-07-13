import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from './../../app.routes';
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

  // QUANDO SI CLICCA SUI PULSANTI O NEL DOCUMENTO, IL DROPDOWN SI CHIUDE
  constructor(){
    document.addEventListener('click', (e:Event)=>{
      let result =(e.target as HTMLInputElement).className
      let dropdown =document.querySelector("details.auto-dropdown")
      if (result!="auto-dropdown") dropdown?.removeAttribute("open")
    })
  }
}