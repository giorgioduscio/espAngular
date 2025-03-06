import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { randomNumber } from '../../../tools/randomCompiler';
import { ChatModalsComponent } from "../chatModals/chatModals.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgFor, NgIf, RouterModule, ChatModalsComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../chat.component.css', '../styles/navChat.css']
})

export class MessagesComponent {
  constructor( private router:ActivatedRoute, private chatService:ChatService, private authService:AuthService, ){
    this.router.params.subscribe(params =>this.chatKey =params['chatKey'])
    // se si aggiorna la chat, aggiorna i messaggi
    this.syncChat
    window.addEventListener('popstate',this.ci)
    effect(()=>{      
      let findChat =this.chatService.chats() .find(chat=> chat.key===this.chatKey)
      if(findChat){ 
        if(!findChat.messages ) this.chat.messages =[]
        this.chat =findChat
        this.messages =JSON.parse(JSON.stringify( findChat.messages ))
      }
    })
  }

  chatKey :string =''
  chat! :Chat 
  messages :Message[] =[]
  syncChat =setInterval(()=>{
    this.chatService.getChats()   
  },2000);
  ci =()=>clearInterval(this.syncChat) 
  // LO SCRITTORE E' LO STESSO CHE HA FATTO L'ACCESSO?
  isMyMessage =(i:number)=> this.authService.user()?.id ===this.messages[i].IDuser 


  // TODO AGGIUNGI MESSAGGIO
  onAddMessage(form:NgForm){
    const updatedChat :Chat =JSON.parse(JSON.stringify( this.chat ))
    const input :Message =form.value
    const user =this.authService.user()
    const time =`${new Date().getHours()}:${new Date().getMinutes()}`
    
    updatedChat.messages.push({
      IDmessage: randomNumber(999999999),
      message: input.message,
      IDuser: user ?user.id :404,
      username: user ?user.username :'Sconosciuto',
      time: time
    })
    this.chatService.patchChat(this.chatKey, updatedChat)
    this.messages =updatedChat.messages
    form.reset()
  }
}

