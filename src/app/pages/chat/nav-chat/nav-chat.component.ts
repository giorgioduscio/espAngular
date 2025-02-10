import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { EditModeService } from '../edit-mode.service';

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [RouterModule, MatIcon, NavbarComponent],
  templateUrl: './nav-chat.component.html',
  styleUrls: ['../styles/navChat.css']
})

export class NavChatComponent {
  constructor(public ems:EditModeService){}
}