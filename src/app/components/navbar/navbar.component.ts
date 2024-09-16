import { Component } from '@angular/core';
import { DropdownComponent } from "./dropdown/dropdown.component";
import { RouterModule } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ DropdownComponent, RouterModule, ProfileComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}