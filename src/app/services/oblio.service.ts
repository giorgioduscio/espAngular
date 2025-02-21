import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { mapper } from '../tools/mapper';
import { OblioCard } from '../interfaces/oblioCard';

@Injectable({ providedIn: 'root' })
export class OblioService {
  constructor(private http: HttpClient){
    this.getCards()
  }
  
  private url ="https://gdrcards-default-rtdb.europe-west1.firebasedatabase.app/oblio"
  cards =signal<OblioCard[]>([])
  private getCards(){
    this.http.get<{[k:string]:OblioCard}>(this.url +'.json').subscribe((res=>{
      if(res) this.cards.set( mapper(res) )
      else this.cards.set([])
      // console.log("get", res, this.cards());
    }))
  }
  addCard(newCard:OblioCard){
    this.http.post( this.url+".json", newCard ).subscribe(res=>{
      this.getCards()

      setTimeout(()=> console.log("add",this.cards()[ this.cards().length-1 ]), 1000);
    })  
  }
  deleteCard(key:string){
    this.http.delete(`${this.url}/${key}.json`).subscribe(res=>{
      this.getCards()
      setTimeout(()=> console.log("delete", this.cards()), 1000)
    })
  }
  patchCard(key:string, newCard:OblioCard){
    this.http.put(`${this.url}/${key}.json`, newCard).subscribe(res=>{
      this.getCards()

      setTimeout(()=> console.log("patch", this.cards().find(c=>c.key==key)), 1000);
    })
  }

}
