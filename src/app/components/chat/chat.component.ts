import { Component, signal, WritableSignal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, chatEditMode } from '../../interfaces/chat';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavChatComponent } from './nav-chat/nav-chat.component';
import { randomId, randomImage } from './autocomp';

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
  // MOSTRA TUTTE LE CHAT
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
  // AGGIUNGE UN ELEMENTO CHAT
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
  editMode :chatEditMode ={
    active: false,
    idGroups: []
  }
  active =signal(false)
  idGroups :WritableSignal<string[]>=signal([])
  // QUANDO PREMI PULSANTE EDIT, MANDA IL RISPETTIVO ID
  editFunction(newId:string, e:Event, i:number){
    // const chats =document.querySelectorAll(".chat")
    const chat =(e.target as HTMLInputElement).parentElement
    

    //todo
    if(this.active()){ //?EDIT E' ATTIVO? 
      //SI: CONTROLLA TUTTI GLI ID
      let controll ={ isRepeat :false, index :0 }
      this.idGroups().map(idToControll=>{
        //?L'ELEMENTO E' STATO GIA' SELEZIONATO?
        if(newId===idToControll) controll.isRepeat =true;
      })

      if(controll.isRepeat){ 
        //fix//SI: DESELEZIONA ELEMENTO 
        this.idGroups.set(this.idGroups().filter(stoneId =>stoneId!==newId))
        chat?.classList.remove("selected")
      }else{ 
        //fix//NO: ATTIVA EDIT E SELEZIONA ELEMENTO 
        this.idGroups.update(elements =>[...elements, newId])
        chat?.classList.add("selected")
      }

    //todo
    }else{ 
      //NO: ATTIVA EDIT E SELEZIONA ELEMENTO
      this.active.set(true)
      this.idGroups.set([...this.idGroups(), newId])
      chat?.classList.add("selected")
    }

    //LE SELEZIONI SONO 0? SI: DISATTIVA EDIT
    if (this.idGroups().length===0){ 
      this.active.set(false)
      this.idGroups.set([]) 
    }

    // console.log('chat', this.active(), this.idGroups());
  }
}