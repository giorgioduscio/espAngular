import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { closeDropdown } from '../closeDropdown';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  // COPIA ROUTER
  routerClone =routes.filter(page =>
    (page.show) && (page.path !==document.title)
  )
    
  constructor(){
    closeDropdown("dropdown")
  }
}
