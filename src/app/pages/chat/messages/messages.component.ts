import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth.service';
import { randomNumber } from '../../../tools/randomCompiler';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgFor, RouterModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', '../chat.component.css', '../styles/navChat.css']
})

export class MessagesComponent {
  constructor( private router:ActivatedRoute, private chatService:ChatService, private authService:AuthService, ){
    this.router.params.subscribe(params =>this.chatKey =params['chatKey'])
    this.syncChat()
    effect(()=>{
      let preventUndefined =this.chatService.chats() .filter(chat=>chat.key===this.chatKey)[0]
      if(preventUndefined){
        this.chat =preventUndefined
        this.messages =this.chat.messages[0].IDmessage===404 ?undefined :this.chat.messages
      }
    })
  }


  // VISUALIZZARE LA CHAT
  syncChat(){
    setInterval(()=>{ 
      // console.log('sync');
      this.chatService.getChats() 
    },2000);
  }
  chatKey :string =''
  chat :Chat ={idChat:0, titleChat:'', imageUrl:'', messages:[] }
  messages :Message[] |undefined =[]
  // LO SCRITTORE E' LO STESSO CHE HA FATTO L'ACCESSO?
  isMyMessage=(i:number)=> this.authService.user()?.id ===this.chat.messages[i].IDuser 


  // TODO AGGIUNGI MESSAGGIO
  onAddMessage(form:NgForm){
    const updatedChat =this.chat
    const input :Message =form.value
    const user =this.authService.user()
    const time =`${new Date().getHours()}:${new Date().getMinutes()}`

    if (this.chat.messages[0].IDmessage===404) this.chat.messages.pop() //fix initarray
    
    updatedChat.messages.push({
      IDmessage: randomNumber(999999999),
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

