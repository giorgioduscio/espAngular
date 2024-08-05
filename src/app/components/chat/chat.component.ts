import { Component, signal, WritableSignal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, chatEditMode } from '../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from './nav-chat/nav-chat.component';
import { randomId, randomImage } from './autocomp';
import { editCounter } from './editCounter';

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
  styleUrls: ['./chat.chats.css', './chat.inputbox.css']
})

export class ChatComponent {
  //optimize MOSTRA TUTTE LE CHAT
  chats :Chat[] =[]
  constructor(private chatService:ChatService){
    document.title ="Chat"

    chatService.getChat().subscribe((res:any) =>{
      this.chats =Object.keys(res) .map(key=>{
        res[key]["idFirebase"] =key
        return res[key]}
      )
    })
  }

  //optimize AGGIUNGE UN ELEMENTO CHAT
  newGroup(groupForm:any){  
    this.chatService.addChat({
      idChat: randomId(),
      titleChat: groupForm.value.input,
      content: [],
      imageUrl: randomImage(),
    })
    .subscribe(res=>{ console.log(res);location.reload() })
  }

  // optimize
  editActivation =signal(false)
  idGroups :WritableSignal<string[]> =signal([])
  // QUANDO PREMI PULSANTE EDIT, MANDA IL RISPETTIVO ID
  handleClick(newId:string, e:Event){
    const chat =(e.target as HTMLInputElement).parentElement    
    editCounter(this.editActivation, this.idGroups, newId, chat)
    // console.log('chat', this.editActivation(), this.idGroups());
  }
}