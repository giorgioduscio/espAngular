import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatIcon } from "@angular/material/icon";
import { NgFor, NgIf } from "@angular/common";
import { AssistantGdrService } from "./tools/assistant-gdr.service";
import { OblioCardComponent } from "./oblioCard.component";
import { InfoModalComponent } from "./oblioModal.component copy";

@Component({
  selector: 'app-gdr',
  standalone: true,
  imports: [NavbarComponent, MatIcon, NgFor, NgIf, OblioCardComponent, RouterModule, InfoModalComponent],
  styleUrl: './gdr.component.css',
  template:`

<article>
  <app-navbar></app-navbar>

  <header> <div class="container">
    <aside>
      <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#infoModal" type="button" aria-labelledby="modal">
        <mat-icon>info</mat-icon>
      </button>
      <button class="btn btn-success" (click)="assist.onAddCharacter()">
        <mat-icon>add</mat-icon>
      </button>
      <button class="btn btn-danger" *ngIf="assist.mainCard" (click)="assist.onDelete()">
        <mat-icon>delete</mat-icon>
      </button>
    </aside>

    <main *ngIf="assist.cards.length">
      <button *ngFor="let card of assist.cards; let i=index"
        routerLink="/gdr/{{assist.keys().userKey}}/{{card.key}}"
        (click)="assist.setMainCard()"
        class="badge rounded-pill"
        [id]="card.key"
      >{{ card.head.nome }}</button>
    </main>
  </div></header>                             

  <!-- STATISTICHE DELLE CARD -->
  @if(assist.cards.length){ <app-oblioCard></app-oblioCard> }
  @else {
    <div noCards>
      <h3>Non hai ancora personaggi!! :-(</h3>
      <p>Premi il pulsante <i>*verde*</i> in basso per crearne uno</p>
    </div>
  }
  <!-- MODALE PER LA CREAZIONE DEL PERSONAGGIO -->
  <app-oblioModal></app-oblioModal>
  <footer></footer>
</article>  `
})
export class GdrComponent {
  constructor(public assist:AssistantGdrService, private ar:ActivatedRoute){
    this.ar.params.subscribe(p=>{ 
      // @ts-ignore
      this.assist.keys.set(p)
      window.scrollTo(0, 0) 
    })
  }

}
