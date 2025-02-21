import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { NgFor } from "@angular/common";
import { MainGdrService } from "./main-gdr.service";
import { OblioCard } from "../../interfaces/oblioCard";
import inputType from "../../tools/inputType";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-oblioCard',
  standalone: true,
  imports: [MatIcon, NgFor, FormsModule, ],
  styleUrl: './gdr.component.css',
  templateUrl:'./oblioCard.component.html'
})
export class OblioCardComponent {
  constructor(public main:MainGdrService){}

  it =inputType
  caratteristiche :(keyof OblioCard['left']['punteggi_caratteristica'])[] 
    =["costituzione", "destrezza", "forza", "carisma", "intelligenza", "saggezza"]

  templateCard(oblioCard:OblioCard){
    const result =this.toArray(oblioCard)
      .filter(f=> f.title!='id' &&f.title!='key' &&f.title!='userKey')
    // ordina i campi
    result[1].value.reverse()
    result[2].value.reverse()
    // comincia con il nome
    const nameIndex = result[0].value.findIndex((item:any) => item.title ==='nome');
    let hhh =result[0].value.splice(nameIndex, 1)[0]
    result[0].value.unshift(hhh)
  
    return result
  }
  toArray(obj:{[k:string]:any}) :{title:string, value:any}[] {
    return Object.entries(obj).map(e=>{
      const title=e[0], value=e[1]
      let isObj =typeof value==='object' &&!Array.isArray(value)
      return {title, value:isObj ?this.toArray(value) :value}
    })
  }

}
