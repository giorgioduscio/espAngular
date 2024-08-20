import { Component, effect } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AlphaComponent } from "./alpha.component";
import { BetaComponent } from "./beta.component";
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [
    NavbarComponent, 
    AlphaComponent, 
    BetaComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  // OPTIMIZE HTML
  template: `
  <app-navbar></app-navbar>

  <article><div class="box">
    <main class="hierarchy">
      <h2>Main</h2>
      <ol> @for (item of mainVar; track item; let i=$index) { @if(item.price>1000){
        <li>
          <form [formGroup]="form" (submit)="submit(item.id, form)"> 
            <input type="text" [placeholder]="item.title" formControlName="title">
            <input type="number" [placeholder]="item.price" formControlName="price">
            <button type="submit">Safe</button>
          </form>
        </li>
      }}</ol>

      <div class="childs">
        <app-alpha></app-alpha>
        <app-beta></app-beta>
      </div>
    </main>

  </div></article>
  `,
  styleUrl: './hierarchy.component.css',
})
// OPTIMIZE TYPESCRIPT
export class HierarchyComponent{
  mainVar :Product[] =[]
  form!: FormGroup;

  constructor(private productsService:ProductsService){
    document.title=`Hierarchy`
    effect(()=>{
      this.mainVar =productsService.realtimeProducts()
      console.log(document.title, this.mainVar);
    })
    this.form =new FormGroup({
      title: new FormControl,
      price: new FormControl,
    })
  }
  submit(itemID:number, form:FormGroup){
    const product :Product =this.mainVar .filter(product=>product.id===itemID)[0]
    product.title =form.value.title
    product.price =form.value.price
    
    this.productsService.realtimeProducts.set(this.mainVar)
    console.log(this.mainVar);
  }
}