import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AlphaComponent } from "./alpha.component";
import { BetaComponent } from "./beta.component";
import { Animals, HierarchyService } from './hierarchy.service';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [NavbarComponent, AlphaComponent, BetaComponent],
  template: `
  <app-navbar></app-navbar>

  <article><div class="box">
    <main class="hierarchy">
      <h2>Main</h2>
      <ol>
        @for (item of mainVar; track $index) {
          <li>{{item.name}}</li>
        }
      </ol>

      <div class="childs">
        <app-alpha></app-alpha>
        <app-beta></app-beta>
      </div>
    </main>

  </div></article>
  `,
  styleUrl: './hierarchy.component.css',
})

export class HierarchyComponent{
  mainVar :Animals[] =[]

  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    console.log(this.mainVar);
  }
}