/* 
  FUNZIONE CHE TRASFORMA FROMCONTROLL IN ARRAY PER TEMPLATE
  1) correla il tipo di valore iniziale con il tipo di input string=>text
  2) cancella ciò che c'è dopo : dal valore del formControl
  3) assegna ciò che c'è dopo : al tipo di input

  ATTENZIONE SINTASSI: 
    nome_del_campo: new FormControl(':typoInput', [Validators.required, ...]),
    nome_select: new FormControl([{value:0, title:'titolo'}, ...], [Validators.required, ...]),
*/

import { FormControl } from "@angular/forms"
import duckcase from "./duckcase"

export default function BuildNgForm(controlObject:{[k:string]:FormControl}, defaultType ='text'){ 
  // OGGETTO PER LA VALIDAZIONE
  const controller :typeof controlObject ={}
  Object.keys(controlObject).forEach(k=> controller[k] =controlObject[k])
  // ARRAY PER IL TEMPLATE
  const templateForm =Object.keys(controller).map(key=>{
    let input :TemplateField ={
      key :key,
      title :duckcase(key),
      type :defaultType,
      value :'',
    }
    let field :Option =controller[input.key].value

    // 1) TIPI
    if (typeof field==='number') input.type ='number'
    else if (typeof field==='boolean') input.type ='checkbox'

    // STRINGA PIENA
    else if (typeof field==='string' && field){ 
      // @ts-ignore
      let splitter =field.split(':')
      controller[input.key].setValue(splitter[0])  // 2) cancella dopo :
      input.value =splitter[0] // 3)
      input.type =splitter[1] // 3)

    // SELECT
    }else if(Array.isArray(field)){
      controller[input.key].setValue('')
      input.value =''
      input.type ='select'
      input.options =field
    }
    
    // TEMPLATE: ARRAY DI OGGETTI    
    return input
  })
  
  return { controller, templateForm }
}

interface TemplateField{
  key:string
  title:string
  value:string
  type:string
  options?:Option[]
}
interface Option{ value:number|string, title:string }