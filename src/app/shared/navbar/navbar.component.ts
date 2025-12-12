import { Component } from '@angular/core';
import { RoutesComponent } from "./routes/routes.component";
import { RouterModule } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RoutesComponent, RouterModule, ProfileComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

}