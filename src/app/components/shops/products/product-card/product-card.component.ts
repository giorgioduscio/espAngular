import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()product: any
  amount =signal(0)

  increment(){ this.amount.update(state =>state +1) }
  decrement(){ this.amount()>0&& this.amount.update(state =>state -1) }
  addToCart(){
    let newOrdination ={
      id: this.product.id, 
      price: this.product.price,
      title: this.product.title,
      amount: this.amount(),
      imageUrl: this.product.images[0],
    }
    this.amount.set(0)
    console.log(newOrdination);
  }
}
