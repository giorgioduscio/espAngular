import { Component } from '@angular/core';
import { Animals, HierarchyService } from './hierarchy.service';

@Component({
  selector: 'app-alpha',
  standalone: true,
  imports: [],
  template: `
  <main class="alpha">
    <h2>Alpha</h2>
    <ol>
      @for (item of mainVar; track $index) {
        <li>{{item.name}}</li>
      }
    </ol>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class AlphaComponent {
  mainVar :Animals[] =[]
  

  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    console.log(this.mainVar);
  }
}
