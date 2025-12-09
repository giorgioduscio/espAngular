export default interface PersonaggioDND {
  nome_personaggio: string,
  generali: [
    { key: 'background', value: string, type: 'text' },
    { key: 'nome_giocatore', value: string, type: 'text' },
    { key: 'razza', value: string, type: 'text' },
    { key: 'allineamento', value: string, type: 'text' },
    { key: 'punti_esperienza', value: number, type: 'number' },
  ],

  // colonna sinistra
  ispirazione: number,
  punteggi: [
    { key: 'forza', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }, 
      { key: 'Atletica', value: boolean }
    ]},
    { key: 'destrezza', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }, 
      { key: 'Acrobatica', value: boolean }, 
      { key: 'Rapidità di Mano', value: boolean }, 
      { key: 'Furtività', value: boolean }
    ]},
    { key: 'costituzione', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }
    ]},
    { key: 'intelligenza', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }, 
      { key: 'Arcano', value: boolean }, 
      { key: 'Indagare', value: boolean }, 
      { key: 'Natura', value: boolean }, 
      { key: 'Religione', value: boolean }, 
      { key: 'Storia', value: boolean }
    ]},
    { key: 'saggezza', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }, 
      { key: 'Addestrare Animali', value: boolean }, 
      { key: 'Intuizione', value: boolean }, 
      { key: 'Medicina', value: boolean }, 
      { key: 'Percezione', value: boolean }, 
      { key: 'Sopravvivenza', value: boolean }
    ]},
    { key: 'carisma', value: number, abilities: [
      { key: 'Tiro Salvezza', value: boolean }, 
      { key: 'Inganno', value: boolean }, 
      { key: 'Intimidire', value: boolean }, 
      { key: 'Intrattenere', value: boolean }, 
      { key: 'Persuasione', value: boolean }
    ]},
  ],
  competenze:[
    {key:'linguaggi', value:string},
    {key:'armi', value:string},
    {key:'armature', value:string},
    {key:'strumenti', value:string},
  ],
  
  // colonna centrale
  classe_armatura: number,
  punti_ferita_attuali: number,
  punti_ferita_temporanei: number,
  ts_falliti: number,
  ts_successi: number,
  attacchi:string[],
  equipaggiamento: {qta:number, value:string}[],
  monete: [ 
    { key: 'rame', value: number },
    { key: 'argento', value: number },
    { key: 'electrum', value: number },
    { key: 'oro', value: number },
    { key: 'platino', value: number }
  ],

  // colonna destra
  personalita: [
    {key:'tratti_caratteriali', value:string},
    {key:'ideali', value:string},
    {key:'legami', value:string},
    {key:'difetti', value:string},
  ],
  privilegi:string[]
}
