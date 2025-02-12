import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { randomId } from '../../../tools/randomCompiler';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgFor, RouterModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../chat.component.css', '../styles/navChat.css']
})

export class MessagesComponent {
  chatKey :string =''
  chat :Chat ={idChat:0, titleChat:'', imageUrl:'', messages:[] }
  messages :Message[] |undefined =[]
  // lo scrittore è lo stesso che ha fatto l'accesso?
  isMyMessage=(i:number)=> this.authService.user()?.id ===this.chat.messages[i].IDuser 

  // TODO MOSTRA MESSAGGI
  constructor(
    private router:ActivatedRoute, 
    private chatService:ChatService,
    private authService:AuthService,
  ){
    this.router.params.subscribe(params =>this.chatKey =params['chatKey'])
    chatService.getChats()
    effect(()=>{
      let preventUndefined =chatService.chats() .filter(chat=>chat.key===this.chatKey)[0]
      if(preventUndefined){
        this.chat =preventUndefined
        this.messages =this.chat.messages[0].IDmessage===404 ?undefined :this.chat.messages //fix initarray
      }
    })
  }
  // TODO AGGIUNGI MESSAGGIO
  onAddMessage(form:NgForm){
    const updatedChat =this.chat
    , input :Message =form.value
    , user =this.authService.user()
    , time =`${new Date().getHours()}:${new Date().getMinutes()}`

    if (this.chat.messages[0].IDmessage===404) this.chat.messages.pop() //fix initarray
    
    updatedChat.messages.push({
      IDmessage: randomId(),
      message: input.message,
      IDuser: user ?user.id :404,
      username: user ?user.username :'Sconosciuto',
      time: time
    })
    this.chatService.patchChat(this.chatKey, updatedChat)
    this.messages=this.chat.messages
    // console.log("updatedChat",this.messages, );
    form.reset()
  }
}

