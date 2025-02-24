import { effect, Injectable, signal } from '@angular/core';
import { OblioCard } from '../../../interfaces/oblioCard';
import { OblioService } from '../../../services/oblio.service';
import initOblioCharacter from './initOblioCharacter';
import { Router } from '@angular/router';

/*
  ngform
  andare nella parte alta della pagina
  piccolo badge in alto con un riassunto delle stat
*/
@Injectable({ providedIn: 'root' })
export class AssistantGdrService {
  constructor(private oblioService:OblioService, private router:Router){
    effect(()=>{
      window.scrollTo(0, 0);
      this.cards =oblioService.cards() .filter(c=> c.userKey===this.keys().userKey)     
      this.setMainCard()
      setTimeout(()=> this.pillsColor(), 500)      
    })
  }

  // VISUALIZZAZIONE 
  cards: OblioCard[] =[]
  keys =signal({userKey:'', charKey:''})
  mainCard :OblioCard |undefined
  setMainCard(){ 
    // prende la chiave della card dalla route
    let match =this.cards.find(c=> c.key===this.keys().charKey)
    // se trova la chiave e un match, inizializza
    if(match){ 
      this.mainCard =match
      document.title ='Scheda di ' +this.mainCard.head.nome

    // cerca un valore di default
    }else{
      // se hai altri personaggi, visualizza il primo
      if(this.cards[0]){ 
        this.mainCard =(this.cards[0])
        this.router.navigate([`/gdr/${this.keys().userKey}/${this.cards[0].key}`])
        
      // altrimenti mostra una pagina vuota
      } else this.mainCard =undefined
    }
    this.pillsColor()
  }
  // gestire il colore delle pills
  pillsColor(){
    let selectedPill =document.querySelector('.rounded-pill.text-bg-success')
      if(selectedPill) selectedPill.classList.remove('text-bg-success')
    let newSelectedPill =document.querySelector('.rounded-pill#'+this.keys().charKey)
      if(newSelectedPill) newSelectedPill.classList.add('text-bg-success')
  }


  // AGGIUNGERE SCHEDE
  onAddCharacter(){
    const newCard =initOblioCharacter(this.keys().userKey)
    this.oblioService.addCard(newCard)
    
    setTimeout(()=>{
      this.router.navigate([`/gdr/${this.keys().userKey}/${this.cards[ this.cards.length -1 ].key}`])
    }, 500);
  }
  // ELIMINARE SCHEDE
  onDelete(){
    if(confirm('Eliminare personaggio?')){
      this.oblioService.deleteCard(this.mainCard?.key!)
      
      setTimeout(()=>{        
        if(this.cards.length) this.router.navigate([`/gdr/${this.keys().userKey}/${this.cards[0].key}`])
        else this.router.navigate([`/gdr/${this.keys().userKey}/null`])
      }, 500);
    }
  }
  // MODIFICARE SCHEDE
  onUpdate(e:Event, sectionKey:string, fieldKey="", i=-1){
    const {value, type, name} =e.target as HTMLInputElement
    const newValue = type==='number' ?Number(value) :value
    let newCard :OblioCard =this.mainCard!
    // @ts-ignore EQUIPAG. E ABILITA'
    if(i!==-1 &&fieldKey) newCard[sectionKey][fieldKey][i][name] =newValue
    // @ts-ignore PUNTEGGI CARATTERISTICA
    else if(fieldKey) newCard[sectionKey][fieldKey][name] =Number(newValue)
    // @ts-ignore CAMPI NORMALI
    else newCard[sectionKey][name] =newValue
    
    // console.log(newCard.head);
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
