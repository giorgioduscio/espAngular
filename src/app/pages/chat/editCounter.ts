import { WritableSignal } from "@angular/core";

export function editCounter(
    editMode :WritableSignal<{active:boolean,idGroups:string[]}>, 
    newId :string,
) 
{
  //EDIT E' ATTIVO? 
  //todo SI: CONTROLLA TUTTI GLI ID
  if(editMode().active){ 
    let controll ={ isRepeat :false, index :0 }
    //?L'ELEMENTO E' STATO GIA' SELEZIONATO?
    editMode().idGroups.map(idToControll=>{
      if(newId===idToControll) controll.isRepeat =true;
    })
  
    if(controll.isRepeat){ 
      //fix//SI: DESELEZIONA ELEMENTO 
      editMode().idGroups =(editMode().idGroups.filter(stoneId =>stoneId!==newId))
      document.getElementById(newId)?.classList.remove("selected")
    }else{ 
      //fix//NO: ATTIVA EDIT E SELEZIONA ELEMENTO 
      editMode().idGroups =[...editMode().idGroups, newId]
      document.getElementById(newId)?.classList.add("selected")
    }
  
  //todo NO: ATTIVA EDIT E SELEZIONA ELEMENTO
  }else{ 
    editMode().active =(true)
    editMode().idGroups =[...editMode().idGroups, newId]
    document.getElementById(newId)?.classList.add("selected")
  }

  //todo LE SELEZIONI SONO 0? SI: DISATTIVA EDIT
  if (editMode().idGroups.length===0){ 
    editMode().active =(false)
    editMode().idGroups =[]
  }  
}