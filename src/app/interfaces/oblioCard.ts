export interface OblioCard{
  id:number
  userKey:string
  key?:string

  head:{
    nome:string
    ispirazione:number
    punti_vita:number
    monete:number
    protezione:number
  }

  left:{
    punteggi_caratteristica:{
      costituzione:string
      destrezza:string
      forza:string
      carisma:string
      intelligenza:string
      saggezza:string
    }
    abilita:{ 
      bonus:number, 
      description:string 
    }[]
  }

  right:{
    lingue:string
    equipaggiamento:{ 
      quantita:number, 
      titolo:string 
    }[]
  }
}