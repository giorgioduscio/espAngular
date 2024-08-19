import { Component } from '@angular/core';
import { Animals, HierarchyService } from './hierarchy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beta-child',
  standalone: true,
  imports: [FormsModule],
  template: `
  <main class="betaChild">
    <h2>BetaChild</h2>
    <ol>
      @for (item of mainVar; track $index) {
        <li><input type="text" [(ngModel)]="item.name"></li>
      }
    </ol>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class BetaChildComponent {
  mainVar :Animals[] =[]
  
  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    console.log(this.mainVar);
  }
}
