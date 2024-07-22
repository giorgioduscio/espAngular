import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from './nav-chat/nav-chat.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NavChatComponent,
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent {
  username :string ='Ciccio'
  insertUser(userform:any){
    this.username =userform.value.username
    userform.value.username =''
  }

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


  newGroup(groupForm:any){  
    this.chatService.addChat({
      idChat: Math.random(),
      titleChat: groupForm.value.input,
      content: [],
      imageUrl: 'https://img.freepik.com/vettori-gratuito/cartone-animato-donna-intelligente-con-penna-e-lampadina-bulb_53876-113797.jpg?t=st=1721546528~exp=1721550128~hmac=ba4b4d64d3ef36dc9c767750a444d297f1737c882d6c2ad46811f37db3598646&w=826',
    })
    .subscribe(res=>{ console.log(res);location.reload() })
  }

  
  deleteGroup(i:number){
    this.chatService.deleteChat(this.chats[i].idFirebase!)
    .subscribe(res=>{ console.log(res);location.reload() })
  }
}
