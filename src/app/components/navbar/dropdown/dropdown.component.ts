import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  // COPIA ROUTER
  routerClone =routes.filter(page =>
    (page.show) && (page.path !==document.title))

    constructor(){
      
    // QUANDO SI CLICCA SU ANCHOR, SUMMARY O NEL DOCUMENTO, IL DROPDOWN SI CHIUDE
    document.addEventListener('click', (e:Event)=>{
      (e.target as HTMLInputElement).className!=="dropdown"
        ? document.querySelector("details.dropdown")?.removeAttribute("open")
        : console.log("classe dropdown");
    })
  }
}
