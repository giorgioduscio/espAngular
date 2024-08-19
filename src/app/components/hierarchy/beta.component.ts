import { Component } from '@angular/core';
import { Animals, HierarchyService } from './hierarchy.service';
import { BetaChildComponent } from './beta-child.component';

@Component({
  selector: 'app-beta',
  standalone: true,
  imports: [BetaChildComponent],
  template: `
  <main class="beta">
    <h2>Beta</h2>
    <ol>
      @for (item of mainVar; track $index) {
        <li>{{item.name}}</li>
      }
    </ol>
    
    <div class="childs">
      <app-beta-child></app-beta-child>
    </div>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class BetaComponent {
  mainVar :Animals[] =[]
  

  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    console.log(this.mainVar);
  }
}
