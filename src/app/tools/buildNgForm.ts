/* 
  FUNZIONE CHE TRASFORMA FROMCONTROLL IN ARRAY PER TEMPLATE
  1) correla il tipo di valore iniziale con il tipo di input string=>text
  2) cancella ciò che c'è dopo : dal valore del formControl
  3) assegna ciò che c'è dopo : al tipo di input
  4) se la chiave inizia con due lettere ed un _ ma non 'id_', elimina i primi tre caratteri
  5) se il formControl è obbligatorio, aggiungi *

  ATTENZIONE SINTASSI: 
    nome_del_campo: new FormControl(':typoInput', [Validators.required, ...]),
*/

import paragraph from "./paragraph"

export default function BuildNgForm(controlObject:any, inputType ='text'){ 
  // OGGETTO PER LA VALIDAZIONE
  const controller =controlObject
  // ARRAY PER IL TEMPLATE
  const templateForm =Object.keys(controller).map(key=>{
    let input ={
      key :key,
      title :paragraph(key),
      type :inputType,
      value :'',
    }
    let field =controller[input.key].value

    // 1) TIPI
    if (typeof field==='number') input.type ='number'
    else if (typeof field==='boolean') input.type ='checkbox'
    else if (typeof field==='string' && field){ // stringa piena
      let splitter =field.split(':')
      controller[input.key].value =splitter[0]  // 2)
      input.value =splitter[0] // 3)
      input.type =splitter[1] // 3)
      // console.log(splitter);
    }
    // 4)
    if(
      key.length >= 3 &&          // Verifica che la stringa abbia almeno 3 caratteri
      !key.startsWith("id_") &&   // Verifica che non inizi con "id_"
      key.substring(2, 3) ==="_" // Verifica che il terzo carattere sia "_"
    ) input.title =paragraph(key.substring(3)) // elimina i primi tre valori
    
    // TEMPLATE: ARRAY DI OGGETTI
    return input
  })
  
  return { controller, templateForm }
}