import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NgFor } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { NavChatComponent } from "../../chat/nav-chat/nav-chat.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    NavChatComponent,
    NavbarComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart :Product[] =[]
  constructor(private cartService:CartService){
    this.cart =cartService.getCart()
    // console.log('cart', this.cart);
  }

  deleteFunction(index:number){
    this.cartService.deleteElement(index)
  }
}
