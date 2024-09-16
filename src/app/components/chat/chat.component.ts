import { Component, signal, WritableSignal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interfaces/chat';
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
  imports: [ NavChatComponent, FormsModule, NgIf, NgFor, RouterLink, MatIconModule,  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.chats.css', './chat.inputbox.css']
})

export class ChatComponent {
  //TODO MOSTRA LE CHAT
  chats :Chat[] =[]
  constructor(private chatService:ChatService){
    document.title ="Chat"

    chatService.getChat().subscribe((res:any) =>{
      this.chats =Object.keys(res) .map(key=>{
        res[key]["key"] =key
        return res[key]}
      )
    })
  }

  //TODO AGGIUNGE UN ELEMENTO CHAT
  newGroup(groupForm:any){
    const body ={
      idChat: randomId(),
      titleChat: groupForm.value.input,
      content: [],
      imageUrl: randomImage(),
    }
    this.chatService.addChat(body)
    .subscribe((res:any)=>{ 
      console.log( res );
      this.chats.push( {...body, key: res.name} )
    })
  }
  //TODO ELIMINA CHAT
  onDeleteGroup(){
    if (confirm('Eliminare il gruppo?')) {
      this.editMode().idGroups.map(id =>{
        this.chatService.deleteChat(id) .subscribe((res:any) =>{ 
          console.log("cancellato", id, res); 
          location.reload() 
        })
      })
      this.resetEdit()
    }
  }

  // optimize EDIT
  
  editMode =signal<{active:boolean,idGroups:string[]}>( {active:false,idGroups:[]} )
  // QUANDO PREMI PULSANTE EDIT, MANDA IL RISPETTIVO ID
  handleClick(newId:string, e:Event){
    const chat =(e.target as HTMLInputElement).parentElement    
    editCounter(this.editMode, newId, chat)
    // console.log('chat', this.editActivation(), this.idGroups());
  }
  // RIPRISTINA L'EDIT
  resetEdit(){
    this.editMode.set( {active:false,idGroups:[]} )
    document.querySelectorAll(".selected")
      .forEach(element =>element.classList.remove("selected"))
  }
}