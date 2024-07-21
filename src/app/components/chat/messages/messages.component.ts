import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { Chat, Message } from '../../../interfaces/chat';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})

export class MessagesComponent {
  idFirebase! :string
  chat! :Chat
  messages! :Message[]

  constructor(private router:ActivatedRoute, private chatService:ChatService){
    this.router.params.subscribe(params =>this.idFirebase =params['id'])

    this.chatService.getMessages(this.idFirebase).subscribe((res:any)=>{
      this.chat =res
      this.messages =Object.keys(this.chat.content) 
        .map((key:any) =>this.chat.content[key])

      console.log("messages", this.messages);
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
