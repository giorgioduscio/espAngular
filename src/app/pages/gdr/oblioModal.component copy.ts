import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "../../components/modal/modal.component";
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-oblioModal',
  standalone: true,
  imports: [ModalComponent, RouterModule, NgIf, NgFor ],
  styleUrl: './gdr.component.css',
  template:`

<app-modal modalId="infoModal">
  <h3>Come cominciare?</h3>
  <ol>
    <li *ngFor="let alpha of elements" class="mt-1">
      <b>{{ alpha.title }}: </b>
      <span>{{ alpha.description }}</span>

      <ul *ngIf="alpha.content">
        <li *ngFor="let beta of alpha.content" class="mt-1">
          <b>{{ beta.title }}: </b>
          <span>{{ beta.description }}</span>

          <ul *ngIf="beta.content">
            <li *ngFor="let gamma of beta.content" class="mt-1">
              <b>{{ gamma.title }}: </b>
              <span>{{ gamma.description }}</span>
            </li>
          </ul>
          
        </li>
      </ul>

    </li>
  </ol>

  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</app-modal>
  `
})
export class InfoModalComponent {
  elements :Element[] =[
    {
      title:'Protezione',
      description:`Assegna un bonus da aggiungere ai tiri che effettui per difenderti in base all'oggetto che impugni`,
      content:[
        {
          title:`Esempi`,
          content:[
            {title:`Scudo piccolo o arma da parata`, description:`+2 (ma solo contro armi da mischia)` },
            {title:`Scudo a rondella o Pelta (scudo classico)`, description:`+2`},
            {title:`Scudo a torre o Scutum`, description:`+3` },
          ] 
        }
      ]
    },
    {
      title:'Punteggi caratteristica',
      description:'Assegna alle sei caratteristiche una qualsiasi combinazione di d8 d8 d6 d6 d4 d4'
    },
    {
      title:'Bonus condizionali',
      description:`Quando si compie un'azione specifica (derivata dall'esperienza, dalla personalità), si aggiunge il bonus. Questo bonus aumenta in base all'utilizzo a discrezione del master`,
      content:[
        {
          title:`Inizio`,
          description:`indicativamente si comincia con 3 bonus condizionali di +2 che si attivano quando il personaggio agisce in una maniera che gli è consona, quando applica una sua competenza o quando utilizza un sistema di combattimento affine`
        },
        {
          title:`Guerriero`,
          description:`+2 quando agisce in maniera meticolosa; +2 quando applica conoscenze riguardo la strategia; +2 quando combatte con un'arma inastata pesante`
        },
        {
          title:`Fabbro imprenditore`,
          description:`+2 quando agisce spinto dal guadagno; +2 quando applica conoscenze da fabbro; +2 quando applica conoscenza sulla guida dei carri`
        },
      ]
    },
    {
      title:`Azioni in scene d'azione`,
      description:`Azioni principali che si possono compiere durante una scena d'azione (Sono quelle di D&D)`,
      content:[
        {
          title:`Attaccare`,
          description:`Effettuare un attacco con un'arma o un incantesimo`,
        },
        {
          title:`Lanciare un incantesimo`,
          description:`Eseguire un incantesimo che richiede un'azione`,
        },
        {
          title:`Scattare`,
          description:`Aumentare la tua velocità di movimento per il turno`,
        },
        {
          title:`Disimpegnarsi`,
          description:`Muoversi fuori dal raggio di un nemico senza provocare un attacco di opportunità`,
        },
        {
          title:`Aiutare`,
          description:`Fornire supporto a un altro personaggio`,
        },
        {
          title:`Nascondersi`,
          description:`Tentare di nasconderti dai nemici`,
        },
        {
          title:`Cercare`,
          description:`Tentare di trovare qualcosa di nascosto`,
        },
        {
          title:`Usare un oggetto`,
          description:`Interagire con un oggetto, come aprire una porta o bere una pozione`,
        },
        {
          title:`Preparare`,
          description:`Prepararsi a compiere un'azione specifica in un momento successivo`,
        },
      ]
    },
  ]
}
interface Element{ title:string, description?:string, content?:Element[] }