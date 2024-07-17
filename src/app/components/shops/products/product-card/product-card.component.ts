import { Component, Input, signal } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()product: any
  
  // QUANTITA'
  amount =signal(0)
  increment(){ this.amount.update(state =>state +1) }
  decrement(){ this.amount()>0 && this.amount.update(state =>state -1) }

  // CARRELLO
  constructor(private cartService:CartService){}
  addToCart(){
    let newProduct :Product ={
      id: this.product.id, 
      price: this.product.price,
      title: this.product.title,
      amount: this.amount(),
      imageUrl: this.product.images[0],
    }
    this.cartService.addElement(newProduct)

    this.amount.set(0)
    console.log(this.cartService.getCart());
  }
}
