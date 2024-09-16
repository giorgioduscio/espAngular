import { Component, Input, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgIf } from '@angular/common';
import { DropdownComponent } from "../../navbar/dropdown/dropdown.component";
import { MatIcon } from '@angular/material/icon';
import { ChatService } from '../../../services/chat.service';
import { ProfileComponent } from "../../navbar/profile/profile.component";

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [RouterModule, NgIf, DropdownComponent, MatIcon, ProfileComponent],
  templateUrl: './nav-chat.component.html',
  styleUrls: ['./nav-chat.component.css','../../navbar/navbar.component.css']
})

export class NavChatComponent {
  routerClone =routes
  @Input() editMode =signal<{active:boolean,idGroups:string[]}>( {active:false,idGroups:[]} )
  @Input() resetEdit! :()=>void;
  @Input() onDeleteGroup! :()=>void;
  constructor(private chatService:ChatService){}
}