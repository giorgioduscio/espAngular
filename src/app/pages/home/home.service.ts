import { Injectable } from '@angular/core';

@Injectable({  providedIn: 'root' })
export class HomeService {

  constructor() { }

  homeCards=[
    {
      imgUrl:"https://img.freepik.com/vettori-gratuito/smartphone-isometrico-con-il-concetto-di-chat_23-2148280532.jpg?t=st=1725466949~exp=1725470549~hmac=7cc0dfc36ccaa61ffe0fbc8932dd2ff6582d8c7df6b6d0f119370cdb9e4cf4d4&w=826",
      title:"Chat", 
      isVisible:true, 
      path:'/chat',
      description:"Simulatore di chat. Può essere utilizzato da qualsiasi dispositivo.Esperimento fallito: non è in tempo reale"
    },
    {
      imgUrl:"https://img.freepik.com/vettori-gratuito/collezione-di-negozi-e-negozi_53876-28381.jpg?t=st=1725467563~exp=1725471163~hmac=23aae358b68d86d1474165dfa57c087954321e86d4ae662f31f60be2b58a0f06&w=1060",
      title:"Shops", 
      isVisible:true, 
      path:'/shops',
      description:"Applicazione per negozi remoti: simula visualizzazione e carrello"
    },
    {
      imgUrl:"https://img.freepik.com/vettori-gratuito/imprenditore-tenendo-la-matita-alla-grande-lista-di-controllo-completa-con-segni-di-graduazione_1150-35019.jpg?t=st=1725467180~exp=1725470780~hmac=d697642f2baf2fd385fc0b38bf8e4dc8a644368aa84e3815a12bb3300f9220da&w=1380",
      title:"List", 
      isVisible:false, 
      path:'/list',
      description:"Lista di cose da fare? Oggetti o alimenti da acquistare? Chissà..."
    },
  ]
}
