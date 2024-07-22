import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
  ],
  templateUrl: './nav-chat.component.html',
  styleUrl: './nav-chat.component.css'
})

export class NavChatComponent {
  routerClone =routes
}
