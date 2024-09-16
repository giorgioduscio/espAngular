import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from '../nav-chat/nav-chat.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ NavChatComponent, MatIconModule, FormsModule, NgFor, NgIf, RouterModule, ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', './fixed.component.css']
})

export class MessagesComponent {
  chatKey :string =''
  chat :Chat ={idChat:0, titleChat:'', content:[], imageUrl:''}
  messages :Message[] =[]
  messagesLength :boolean =false

  // TODO MOSTRA MESSAGGI
  constructor(private router:ActivatedRoute, private chatService:ChatService){
    this.router.params.subscribe(params =>this.chatKey =params['chatKey'])

    this.chatService.getMessages(this.chatKey).subscribe((res:any)=>{
      this.chat ={...res, key: this.chatKey}
      if(this.chat.content!==undefined){
        this.messages =Object.keys(this.chat.content) 
        .map((key:string |any) =>this.chat.content[key])
      }
    })
  }
  // TODO AGGIUNGI MESSAGGIO
  onAddMessage(formData:any){
    this.chatService.addMessage(this.chatKey, {
      IDmessage: Math.random(),
      message: formData.value.message,
      IDuser: 1,
      username: 'LolloMaNonMollo'
    }).subscribe(res=>{console.log(res); location.reload()})
  }
}
