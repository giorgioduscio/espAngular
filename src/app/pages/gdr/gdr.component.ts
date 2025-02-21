import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatIcon } from "@angular/material/icon";
import { NgFor, NgIf } from "@angular/common";
import { MainGdrService } from "./main-gdr.service";
import { OblioCardComponent } from "./oblioCard.component";

@Component({
  selector: 'app-gdr',
  standalone: true,
  imports: [NavbarComponent, MatIcon, NgFor, NgIf, OblioCardComponent],
  styleUrl: './gdr.component.css',
  template:`

<article>
  <app-navbar></app-navbar>

  <header> <div class="container">
    <aside>
      <button class="btn btn-outline-success" (click)="main.onAddCharacter()">
        <mat-icon>add</mat-icon>
      </button>
      <button class="btn btn-outline-danger" *ngIf="main.mainCard" (click)="main.onDelete()">
        <mat-icon>delete</mat-icon>
      </button>
    </aside>

    <main>
      @if (main.cards.length){
        <button *ngFor="let card of main.cards; let i=index"
          (click)="main.setMainCard(card)"
          class="badge rounded-pill"
          [id]="card.key"
          >{{ card.head.nome }}</button>

      }@else {
        <span class="badge rounded-pill text-bg-danger">Non hai personaggi</span>
      }
    </main>
  </div></header>

  <app-oblioCard></app-oblioCard>
  <footer></footer>
</article>  `
})
export class GdrComponent {
  constructor(public main:MainGdrService, private ar:ActivatedRoute){
    // @ts-ignore
    this.ar.params.subscribe(p=> this.main.keys =p)
  }
}
