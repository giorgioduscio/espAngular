import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from '../nav-chat/nav-chat.component';
import { randomId } from '../autocomp';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ NavChatComponent, MatIconModule, FormsModule, NgFor, NgIf, RouterModule, ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', './nav&inputs.component.css']
})

export class MessagesComponent {
  chatKey :string =''
  chat :Chat ={idChat:0, titleChat:'', imageUrl:'', messages:[] }
  messages :Message[] |undefined =[]
  // lo scrittore è lo stesso che ha fatto l'accesso?
  isMyMessage(i:number){ return this.authService.accesserUser()?.id===this.chat.messages[i].IDuser }

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
    , user =this.authService.accesserUser()
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
    console.log("updatedChat",this.messages, );
    form.reset()
  }
}