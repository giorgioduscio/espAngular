import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from '../nav-chat/nav-chat.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    NavChatComponent,
    MatIconModule,
    FormsModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css', './fixed.component.css']
})

export class MessagesComponent {
  idFirebase :string =''
  chat! :Chat
  messages! :Message[]
  messagesLength! :boolean

  constructor(private router:ActivatedRoute, private chatService:ChatService){
    // PRENDE L'ID DALLA NAVBAR
    this.router.params.subscribe(params =>this.idFirebase =params['id'])

    // PRENDE I DATI DAL SERVICE
    this.chatService.getMessages(this.idFirebase).subscribe((res:any)=>{
      this.chat ={...res, idFirebase: this.idFirebase}
      this.messages =Object.keys(this.chat.content) //fix
        .map((key:string |any) =>this.chat.content[key])
      this.messagesLength =this.messages.length===0 ?false :true
      console.log("messages",this.idFirebase, this.chat, this.messages);
    })
  }

  writeMessage(formData:any){
    this.chatService.addMessage(this.idFirebase, {
      IDmessage: Math.random(),
      message: formData.value.message,
      IDuser: 1,
      username: 'LolloMaNonMollo'
    }).subscribe(res=>{console.log(res); location.reload()})
  }
}
