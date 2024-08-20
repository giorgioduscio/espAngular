import { Component } from '@angular/core';
import { Animals, HierarchyService } from './hierarchy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alpha',
  standalone: true,
  imports: [
    FormsModule,
  ],
  template: `
  <main class="alpha">
    <h2>Alpha</h2>
    <ol> @for (item of mainVar; track $index) {
        <li>
          <input type="text" [(ngModel)]="item.name">
        </li>
    }</ol>

    <div class="childs">
      <main></main>
      <main></main>
    </div>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class AlphaComponent {
  mainVar :Animals[] =[]
  

  constructor(hierarchyService:HierarchyService){
    this.mainVar =hierarchyService.animals
    // console.log(this.mainVar);
  }
}
