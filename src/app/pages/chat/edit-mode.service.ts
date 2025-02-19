import { Injectable, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Injectable({  providedIn: 'root' })
export class EditModeService {
  constructor(private chatService:ChatService){}
  editMode =signal<{active:boolean, idGroups:string[]}>({
    active:false, idGroups:[]
  })

  // QUANDO PREMI PULSANTE EDIT, MANDA IL RISPETTIVO ID
  handleClick(newId:string){
    this.editCounter(newId)
    // console.log('chat', newId);
  }

  // RIPRISTINA L'EDIT
  resetEdit(){
    this.editMode.set( {active:false, idGroups:[]} )
    document.querySelectorAll(".selected")
      .forEach(element =>element.classList.remove("selected"))
  }

  // MODIFICA IL COUNTER AL CLICK DELLA CHAT
  // QUALI CHAT DEVE ELIMINARE?
  editCounter( newId:string ){
    //EDIT E' ATTIVO? 
    //todo SI: CONTROLLA TUTTI GLI ID
    if(this.editMode().active){ 
      let controll ={ isRepeat :false, index :0 }
      //?L'ELEMENTO E' STATO GIA' SELEZIONATO?
      this.editMode().idGroups.map(idToControll=>{
        if(newId===idToControll) controll.isRepeat =true;
      })
    
      if(controll.isRepeat){ 
        //fix//SI: DESELEZIONA ELEMENTO 
        this.editMode().idGroups =(this.editMode().idGroups.filter(stoneId =>stoneId!==newId))
        document.getElementById(newId)?.classList.remove("selected")
      }else{ 
        //fix//NO: ATTIVA EDIT E SELEZIONA ELEMENTO 
        this.editMode().idGroups =[...this.editMode().idGroups, newId]
        document.getElementById(newId)?.classList.add("selected")
      }
    
    //NO: ATTIVA EDIT E SELEZIONA ELEMENTO
    }else{ 
      this.editMode().active =(true)
      this.editMode().idGroups =[...this.editMode().idGroups, newId]
      document.getElementById(newId)?.classList.add("selected")
    }
  
    //LE SELEZIONI SONO 0? SI: DISATTIVA EDIT
    if (this.editMode().idGroups.length===0){ 
      this.editMode().active =(false)
      this.editMode().idGroups =[]
    }  
  }

  // ELIMINA LE CHAT SELEZIONATE
  onDeleteGroup(){
    if (confirm('Eliminare il gruppo?')) {
      this.editMode().idGroups.map(id =>{
        this.chatService.deleteChat(id) 
      })
      this.resetEdit()
    }
  }
  // RINOMINA LA CHAT SELEZIONATA
  onRenameGroup(){
    const chatKey =this.editMode().idGroups[0]
    const chat =this.chatService.chats().find(chat=> chat.key===chatKey)
    if(chat){ 
      const newTitle =prompt('Rinomina gruppo', chat.titleChat)
      if(newTitle &&newTitle!==chat.titleChat){
        chat.titleChat =newTitle
        this.chatService.patchChat(chatKey, chat)
      }
    }
    this.resetEdit()
  }

}
