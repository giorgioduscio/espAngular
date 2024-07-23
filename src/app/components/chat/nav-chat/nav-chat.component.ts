import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgIf } from '@angular/common';
import { DropdownComponent } from "../../navbar/dropdown/dropdown.component";

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    DropdownComponent
],
  templateUrl: './nav-chat.component.html',
  styleUrl: './nav-chat.component.css'
})

export class NavChatComponent {
  routerClone =routes
}
