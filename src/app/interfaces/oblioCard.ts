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
      costituzione:4 |6 |8 |10 |12
      destrezza:4 |6 |8 |10 |12
      forza:4 |6 |8 |10 |12
      carisma:4 |6 |8 |10 |12
      intelligenza:4 |6 |8 |10 |12
      saggezza:4 |6 |8 |10 |12
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