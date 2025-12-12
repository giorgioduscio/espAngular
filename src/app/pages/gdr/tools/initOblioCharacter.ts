import { OblioCard } from "../../../interfaces/oblioCard";
import { randomCompiler } from "../../../tools/randomCompiler";

export default function initOblioCharacter(userKey:string):OblioCard {
  return {
    id: randomCompiler.number(999999999),
    userKey: userKey,

    head: {
      nome: randomCompiler.string(),
      ispirazione: 0,
      punti_vita: 40,
      monete: 20,
      protezione: 0
    },

    left: {
      punteggi_caratteristica: {
        costituzione: 4,
        destrezza: 4,
        forza: 6,
        carisma: 6,
        intelligenza: 8,
        saggezza: 8,
      },
      abilita: [
        {
          bonus: 2,
          description: "Quando asseconda la propria personalità"
        },
        {
          bonus: 2,
          description: "Quando applica una propria conoscenza"
        },
        {
          bonus: 2,
          description: "Quando combatte con uno stile di combattimento affine"
        },
      ]
    },

    right: { 
      lingue: "Scegli due lingue (inclusi dialetti)",
      equipaggiamento: [
        {  //AGGIUNGERE IMMAGINE
          quantita: 1,
          titolo: "aggiungi arma e scudo di competenza o un focus da incantatore"
        },
        {
          quantita: 1,
          titolo: "Giaciglio (sacco a pelo)"
        },
        {
          quantita: 1,
          titolo: "Gavetta (kit da pranzo)"
        },
        {
          quantita: 1,
          titolo: "Otre (borraccia)"
        },
        {
          quantita: 1,
          titolo: "Corda di canapa (15 metri)"
        },
        {
          quantita: 10,
          titolo: "Torcia"
        },
        {
          quantita: 1,
          titolo: "Acciarino e pietra focaia"
        },
        {
          quantita: 10,
          titolo: "Razione giornaliera"
        },

      ]
    }


  }
}
