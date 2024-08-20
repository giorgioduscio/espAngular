import { Component } from '@angular/core';
import { Animals, HierarchyService } from './hierarchy.service';
import { BetaChildComponent } from './beta-child.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beta',
  standalone: true,
  imports: [
    BetaChildComponent,
    FormsModule,
  ],
  template: `
  <main class="beta">
    <h2>Beta</h2>
    <ol> @for (item of mainVar; track $index) {
        <li>
          <input type="text" [(ngModel)]="item.name">
        </li>
    }</ol>
    
    <div class="childs">
      <app-beta-child></app-beta-child>
      <main></main>
    </div>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class BetaComponent {
  mainVar :Animals[] =[]
  

  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    // console.log(this.mainVar);
  }
}
