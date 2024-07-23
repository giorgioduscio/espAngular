import { Component } from '@angular/core';
import { DropdownComponent } from "./dropdown/dropdown.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DropdownComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}