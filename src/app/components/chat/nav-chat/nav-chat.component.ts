import { Component, effect, Input, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { NgIf } from '@angular/common';
import { DropdownComponent } from "../../navbar/dropdown/dropdown.component";
import { chatEditMode } from '../../../interfaces/chat';
import { MatIcon } from '@angular/material/icon';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-nav-chat',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    DropdownComponent,
    MatIcon,
],
  templateUrl: './nav-chat.component.html',
  styleUrl: './nav-chat.component.css'
})

export class NavChatComponent {
  routerClone =routes

  @Input() active!: WritableSignal<boolean>;
  @Input() idGroups!: WritableSignal<string[]>;
  constructor(private chatService:ChatService){}

  resetEdit(){
    this.active.set(false)
    this.idGroups.set([])
    document.querySelectorAll(".selected")
      .forEach(element =>element.classList.remove("selected"))
  }

  // QUANDO PREMI IL PULSANTE, CANCELLA GLI ELEMENTI SELEZIONATI
  deleteButton(){
    this.idGroups().map(id =>{
      this.chatService.deleteChat(id)
        .subscribe(res =>{ console.log("cancellato", id, res); location.reload() })
    })
    this.resetEdit()
  }
}
