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

    
  // QUANDO SI CLICCA SULLA PAGINA, IL DROPDOWN SI CHIUDE, ALTRIMENTI HA UN COMPORTAMENTO NORMALE
  constructor(){
    document.addEventListener('click', (e:Event)=>{
      const element =(e.target as HTMLInputElement)
      element.className==="dropdown"
      ? ""//console.log("classe dropdown", element.parentElement)
      : document.querySelector("details.dropdown")?.removeAttribute("open")
    })
  }
}
