import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-beta-child',
  standalone: true,
  imports: [FormsModule],
  template: `
  <main class="betaChild">
    <h2>BetaChild</h2>
    <ol> @for (item of mainVar; track item; let i=$index) { @if(item.price>1000){
      <li>
        <input type="text" [(ngModel)]="item.title">
        <input type="number" [(ngModel)]="item.price">
      </li>
      }}</ol>
  </main>
  `,
  styleUrl: './hierarchy.component.css'
})
export class BetaChildComponent {
  mainVar :Product[] =[]

  constructor(productsService:ProductsService){
    effect(()=>{
      this.mainVar =productsService.realtimeProducts()
    })
  }
}
