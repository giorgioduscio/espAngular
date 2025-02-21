import { effect, Injectable } from '@angular/core';
import { OblioCard } from '../../interfaces/oblioCard';
import { OblioService } from '../../services/oblio.service';
import initOblioCharacter from './initOblioCharacter';
import { NgForm } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MainGdrService {
  constructor(private oblioService:OblioService){
    effect(()=>{
      this.cards =oblioService.cards() .filter(c=> c.userKey===this.keys.userKey)
      this.byLocalStorage()
      setTimeout(()=> this.pillsColor(), 500);
    })
  }

  // VISUALIZZAZIONE 
  cards: OblioCard[] =[]
  keys ={userKey:''}
  mainCard :OblioCard |undefined
  setMainCard(newCard:OblioCard){
    localStorage.setItem('cardKey', newCard.key!)
    this.byLocalStorage()
  }
  // prende la chiave della card dal localStorage
  byLocalStorage(){
    let cardKey =localStorage.getItem('cardKey')
    let match =this.cards.find(c=> c.key===cardKey)
    // se trova la chiave e un match, inizializza
    if(cardKey &&match) this.mainCard =match
    // cerca un valore di default
    else{
      // se hai altri personaggi, visualizza il primo
      if(this.cards[0]) this.setMainCard(this.cards[0])
      // altrimenti mostra una pagina vuota
      else this.mainCard =undefined
    }
    this.pillsColor()
  }
  // gestire il colore delle pills
  pillsColor(){
    let selectedPill =document.querySelector('.rounded-pill.text-bg-success')
    if(selectedPill) selectedPill.classList.remove('text-bg-success')
    let newSelectedPill =document.querySelector('.rounded-pill#'+this.mainCard?.key)
    if(newSelectedPill) newSelectedPill.classList.add('text-bg-success')
  }


  // AGGIUNGERE SCHEDE
  onAddCharacter(){
    const newCard =initOblioCharacter(this.keys.userKey)
    this.oblioService.addCard(newCard)
  }
  // ELIMINARE SCHEDE
  onDelete(){
    if(confirm('Eliminare personaggio?')){
      this.oblioService.deleteCard(this.mainCard?.key!)
      localStorage.removeItem('cardKey')      
    }
  }
  // MODIFICARE SCHEDE
  onUpdate(e:Event, sectionKey:string, fieldKey="", i=-1){
    const {value, type, id} =e.target as HTMLInputElement
    const newValue = type==='number' ?Number(value) :value
    let newCard :OblioCard =this.mainCard!
    // @ts-ignore EQUIPAG. E ABILITA'
    if(i!==-1 &&fieldKey) newCard[sectionKey][fieldKey][i][id] =newValue
    // @ts-ignore PUNTEGGI CARATTERISTICA
    else if(fieldKey) newCard[sectionKey][fieldKey][id] =newValue
    // @ts-ignore CAMPI NORMALI
    else newCard[sectionKey][id] =newValue
    this.oblioService.patchCard(newCard.key!, newCard)
  }
  deleteListElement(sectionKey:string, i:number){
    if(sectionKey==='right') this.mainCard?.right.equipaggiamento.splice(i,1)
    else if(sectionKey==='left') this.mainCard?.left.abilita.splice(i,1)
  }
  addListElement(sectionTitle:string, e:Event){
    const target =e.target as HTMLElement
    let newCard =this.mainCard!
    let quantita      =Number((target.querySelector('#quantita') as HTMLInputElement)?.value)
    const titolo      =(target.querySelector('#titolo') as HTMLInputElement)?.value
    let bonus         =Number((target.querySelector('#bonus') as HTMLInputElement)?.value)
    const description =(target.querySelector('#description') as HTMLInputElement)?.value

    if(quantita<1) quantita=1
    if(bonus<1) bonus=1

    if(titolo ||description){
      if(sectionTitle==='left') newCard.left.abilita.push({ bonus, description })
      else if (sectionTitle==='right') newCard.right.equipaggiamento.push({ quantita, titolo })
      this.oblioService.patchCard(this.mainCard?.key!, newCard)
    }
  }


}
