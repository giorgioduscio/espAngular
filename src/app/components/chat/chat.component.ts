import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    RouterLink,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  chats :Chat[] =[]
  constructor(private chatService:ChatService){
    chatService.getChat().subscribe((res:any) =>{
      this.chats =Object.keys(res) .map(key=>{
        res[key]["idFirebase"] =key
        return res[key]}
      )
      console.log(this.chats);
    })
  }


  newGroup(formData:any){  
    this.chatService.addChat({
      idChat: Math.random(),
      titleChat: formData.value.input,
      content: []
    })
    .subscribe(res=>{ console.log(res);location.reload() })
  }

  
  deleteGroup(i:number){
    this.chatService.deleteChat(this.chats[i].idFirebase!)
    .subscribe(res=>{ console.log(res);location.reload() })
  }
}
