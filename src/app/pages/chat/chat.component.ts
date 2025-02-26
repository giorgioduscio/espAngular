import { Component, effect } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from './nav-chat/nav-chat.component';
import { EditModeService } from './edit-mode.service';
import { randomImage, randomNumber } from '../../tools/randomCompiler';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ NavChatComponent, FormsModule, NgIf, NgFor, RouterLink, MatIconModule,  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  //TODO MOSTRA LE CHAT
  chats :Chat[] =[]
  constructor(public ems:EditModeService, private chatService:ChatService){
    document.title ="Chat"
    chatService.getChats()
    effect(()=>{
      this.chats =chatService.chats()
    })
  }

  //TODO AGGIUNGE UN ELEMENTO CHAT
  newGroup(form:NgForm){
    const body ={
      idChat: randomNumber(999999999),
      titleChat: form.value.input,
      imageUrl: randomImage(),
      messages: [{
        IDmessage: 404,
        message: '404',
        IDuser: 404,
        username: '404',
        time:'',
      }], //fix initarray
    }
    this.chatService.addChat(body)
    form.reset()
  }

}