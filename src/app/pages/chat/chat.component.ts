import { Component, effect } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NavChatComponent } from './navChat/nav-chat.component';
import { EditModeService } from './edit-mode.service';
import { randomImage, randomNumber } from '../../tools/randomCompiler';
import { ChatModalsComponent } from './chatModals/chatModals.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NavChatComponent, FormsModule, NgFor, RouterLink, ChatModalsComponent],
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
    const newChat :Chat ={
      idChat: randomNumber(999999999),
      titleChat: form.value.input,
      imageUrl: randomImage(),
      usersId: [],
      messages: [{
        IDmessage: 404,
        message: '404',
        IDuser: 404,
        username: '404',
        time: '',
      }],
    }
    this.chatService.addChat(newChat)
    form.reset()
  }

}