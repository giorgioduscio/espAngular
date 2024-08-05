import { WritableSignal } from "@angular/core";

export function editCounter(
    editActivation :WritableSignal<boolean>, 
    idGroups :WritableSignal<string[]>,
    newId :string,
    chat :HTMLElement |null
) 
{
  //EDIT E' ATTIVO? 
  //todo SI: CONTROLLA TUTTI GLI ID
  if(editActivation()){ 
    let controll ={ isRepeat :false, index :0 }
    idGroups().map(idToControll=>{
      //?L'ELEMENTO E' STATO GIA' SELEZIONATO?
      if(newId===idToControll) controll.isRepeat =true;
    })
  
    if(controll.isRepeat){ 
      //fix//SI: DESELEZIONA ELEMENTO 
      idGroups.set(idGroups().filter(stoneId =>stoneId!==newId))
      chat?.classList.remove("selected")
    }else{ 
      //fix//NO: ATTIVA EDIT E SELEZIONA ELEMENTO 
      idGroups.update(elements =>[...elements, newId])
      chat?.classList.add("selected")
    }
  
  //todo NO: ATTIVA EDIT E SELEZIONA ELEMENTO
  }else{ 
    editActivation.set(true)
    idGroups.set([...idGroups(), newId])
    chat?.classList.add("selected")
  }

  //todo LE SELEZIONI SONO 0? SI: DISATTIVA EDIT
  if (idGroups().length===0){ 
    editActivation.set(false)
    idGroups.set([]) 
  }  
}