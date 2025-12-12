import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { EditModeService } from '../edit-mode.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [RouterModule, NavbarComponent, NgIf],
  templateUrl: './nav-chat.component.html',
  styleUrls: ['../styles/navChat.css']
})

export class NavChatComponent {
  constructor(public ems:EditModeService){}
}