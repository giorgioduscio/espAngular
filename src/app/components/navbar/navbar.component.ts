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

  // QUANDO SI CLICCA SU ANCHOR, SUMMARY O NEL DOCUMENTO, IL DROPDOWN SI CHIUDE
  // IL DROPDOWN SI CHIUDE DOPO ESSERE STATO APERTO
  constructor(){
    document.addEventListener('click', (e:Event)=>{
      (e.target as HTMLInputElement).className!=="dropdown"
        ? document.querySelector("details.dropdown")?.removeAttribute("open")
        : console.log("classe dropdown");
    })
  }
}