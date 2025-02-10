import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ChatService } from '../../../services/chat.service';
import { DropdownComponent } from '../../../components/navbar/dropdown/dropdown.component';
import { ProfileComponent } from '../../../components/navbar/profile/profile.component';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [RouterModule, NgIf, DropdownComponent, MatIcon, ProfileComponent, NavbarComponent],
  templateUrl: './nav-chat.component.html',
  styleUrls: ['./nav-chat.component.css']
})

export class NavChatComponent {
  routerClone =routes
  @Input() editMode =signal<{active:boolean,idGroups:string[]}>( {active:false,idGroups:[]} )
  @Input() resetEdit! :()=>void;
  @Input() onDeleteGroup! :()=>void;
  constructor(private chatService:ChatService){}
}