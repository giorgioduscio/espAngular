import { Component, signal, effect, WritableSignal, numberAttribute, OnInit, HostListener } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DND, initCharacter, Personaggio } from './dndManual';
import { local } from './localStorage';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import toast from '../../tools/toast';
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-dnd',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, NavbarComponent, ModalComponent],
  templateUrl: './dnd.component.html',
  styleUrl: './dnd.component.css'
})
export class DndComponent implements OnInit { // Implement OnInit
  public dnd = DND;
  public local = local;

  private _character: WritableSignal<Personaggio> = signal(this.loadCharacter());
  public character = this._character.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('character', JSON.stringify(this._character()));
      document.title =`Scheda di ${this._character().nome_personaggio}`;
    });

    setTimeout(()=> toast('Inizializzazione scheda'), 1000)
  }
  ngOnInit(): void {
    this.checkScreenSize();
  }

  //  DIMENZIONE SCHERMO
      @HostListener('window:resize', ['$event'])
      onResize(event: Event): void {
        this.checkScreenSize(); // Controlla la dimensione al ridimensionamento della finestra
      }
      public isMobileView: boolean = false; // Add this line
      private checkScreenSize(): void {
        this.isMobileView = window.innerWidth < 768; 
        console.log('isMobileView', this.isMobileView);
      }
      mobileButtons = [
        { key: 'generalita', label: 'Generalità' },
        { key: 'punteggi', label: 'Punteggi', 
          info:()=> this.character().punteggi
                    .map(punteggio=> this.mod(punteggio.value))
                    .join(' | ')
        },
        { key: 'competenzeLinguaggi', label: 'Competenze e Linguaggi' },
        { key: 'combattimento', label: 'Combattimento' },
        { key: 'attacchiIncantesimi', label: 'Attacchi e Incantesimi' },
        { key: 'equipaggiamento', label: 'Equipaggiamento', 
          info:()=> DND.trasporto(this.character()) +'kg'
        },
        { key: 'personalita', label: 'Personalità' },
        { key: 'trattiPrivilegi', label: 'Tratti e Privilegi' },
      ]


  private loadCharacter(): Personaggio {
    const saved = localStorage.getItem('character');
    return saved ? JSON.parse(saved) : initCharacter();
  }
  
  allineamenti =[
    'Caotico buono', 'Caotico neutrale', 'Caotico malvagio', 
    'Neutrale buono', 'Neutrale', 'Neutrale malvagio', 
    'Legale buono', 'Legale neutrale', 'Legale malvagio'
  ];

  handleChange(event: Event) {
    // se fa parte di un form, annulla
    const form = (event.target as HTMLFormElement).closest('form');
    if (form) return;
    
    // Estrae le proprietà target dall'evento
    const { name, value, type, checked } = event.target as HTMLInputElement;
    
    // Converte il valore in numero se possibile, altrimenti mantiene la stringa
    const nuovoValore =
      name.includes('ts_') ? (checked ? Number(value) : Number(value) - 1)
      : type == 'checkbox' ? checked
      : value === '' ? '' 
      : !isNaN(Number(value)) ? Number(value) 
      : value.trim();

    // Divide il nome dell'input in un array di chiavi per navigare nell'oggetto
    let keys: (string | number)[] = name.split('-');
    // Converte le chiavi numeriche da stringa a number
    keys.forEach((key, i) => {
      if (!isNaN(Number(key))) {
        keys[i] = Number(key);
      }
    });
    
    console.warn(keys, nuovoValore);

    // Aggiorna lo stato del personaggio utilizzando la funzione update del segnale
    this._character.update(personaggioAttuale => {
      // Crea una copia profonda dell'oggetto personaggio attuale per garantire l'immutabilità
      const personaggioNuovo = JSON.parse(JSON.stringify(personaggioAttuale)); 
      let currentLevel: any = personaggioNuovo;      
      
      // per ogni step
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]; // chiave dello step

        // Se la proprietà non esiste, o se non è un oggetto/array, la inizializza.
        // Questo impedisce di tentare di impostare proprietà su valori primitivi.
        if (typeof currentLevel[key] !== 'object' || currentLevel[key] === null || currentLevel[key] === undefined) {
          // Inizializza come array se la chiave successiva è un numero (indice), altrimenti come oggetto.
          currentLevel[key] = typeof keys[i + 1] === 'number' ? [] : {};
        }
        currentLevel = currentLevel[key];
      }
      currentLevel[keys[keys.length - 1]] = nuovoValore; // Imposta il valore finale
      
      return personaggioNuovo;
    });
    toast('Aggiornamento dati');

  }

  //  LISTE
  deleteFromList(listName: keyof Personaggio, index: number) {
    this._character.update(char => {
      const newChar = JSON.parse(JSON.stringify(char));
      if (Array.isArray(newChar[listName])) {
        (newChar[listName] as any[]).splice(index, 1);
      } else console.error(listName, 'non è una lista');
      
      console.warn(newChar[listName].value || newChar[listName]);
      return newChar;
    });
    toast('Aggiornamento dati');
  }

  addToList(listName: string, event: Event) {
    event.preventDefault();
    const form = (event.target as HTMLFormElement).closest('form');
    if(!form) return console.error('form non trovato');
    
    //  Recupera i valori direttamente dal form
        const valueInput = (form.elements.namedItem('value') as HTMLInputElement);
        const qtaInput = (form.elements.namedItem('qta') as HTMLInputElement);
        if (valueInput==null ||
            listName=="equipaggiamento" && qtaInput==null
        ) return console.error('input non validi', valueInput, qtaInput);

        let value: string = valueInput.value;
        let qta: number = Number(qtaInput?.value ||0);
        if(listName=="equipaggiamento" && qta==0) qta=1;

        if (!value) return console.error('Valore input vuoto');
        if (listName=="equipaggiamento" && isNaN(Number(qta))) 
          return console.error('Valore input non valido');

        console.warn(listName, qta||'', value);

    //  AGGIORNAMENTO DATI
        this._character.update(char => {
          const newChar: any = JSON.parse(JSON.stringify(char));

          if (!Array.isArray(newChar[listName])) {
            console.error('non è una lista', listName);
            newChar[listName] = [];
          }

          if (listName === 'equipaggiamento') {
            const elementoEsistente = newChar.equipaggiamento.find((item: any) => 
              item.value.toLowerCase() === value.toLowerCase()
            );
            if (elementoEsistente) {
              elementoEsistente.qta = (elementoEsistente.qta || 1) + qta;
            } else {
              newChar.equipaggiamento.push({ qta, value: value });
            }

          } else if (listName === 'attacchi' || listName === 'privilegi') {
            const list = newChar[listName] as string[];
            if (!list.some(item => item.toLowerCase() === value.toLowerCase())) {
              list.push(value);
            }
          }
          return newChar;
        });
    toast('Aggiornamento dati');
    form.reset();

  }



  //  STAT
      getClassesString(): string {
        const character = this.character();
        const classes = DND.classiCollegate(character);
        if (!classes || classes.length === 0) {
          return '-';
        }
        return classes.map(c => `${c.classe} ${c.livello}`).join(', ');
      }
      liv(){
        return DND.getLivello(this.character());
      }
      BC =()=> DND.getBonusCompetenza(this.character());
      mod = DND.getModificatore;
      passiva =(nomeAbilita:string)=> DND.getValorePassivoAbilita(nomeAbilita, this.character())

  getPlaceholder(key: string, type: string): string {
    switch (key) {
      case 'nome_giocatore':
        return 'Es: Mario Rossi';
      case 'punti_esperienza':
        return 'Es: 0';
      case 'tratti_caratteriali':
        return 'Es: Sono coraggioso e leale.';
      case 'ideali':
        return 'Es: La libertà è sacra.';
      case 'legami':
        return 'Es: Proteggo la mia famiglia.';
      case 'difetti':
        return 'Es: Sono impulsivo.';
      default:
        return type === 'number' ? 'Es: 0' : 'Inserisci qui...';
    }
  }

  //  LOCALSTORAGE
      async copyCharacter() {
        await this.local.copy(this.character());
        toast('Copiato')
      }
      async pasteCharacter() {
        try {
          const pastedChar = await this.local.paste();
          if (pastedChar) {
            this._character.set(pastedChar);
            toast('Aggiornato')
          }
        } catch (error) {
          console.error("Failed to parse character from clipboard", error);
        }
      }


}

