import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NavChatComponent } from "../chat/nav-chat/nav-chat.component";

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    FormsModule,
    NavChatComponent
],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})

export class ShopsComponent {
  shops :any[] =[]
  filter =''
  constructor (private productsService: ProductsService){ 
    productsService.getProducts().subscribe(data =>{ 
      const products :any[] =data.products
      products.map((product, i)=>{ 
        product.brand !=undefined && this.shops.push(
          {id:i+1, title:product.brand, description:product.description, imageUrl:product.images[0]}
        )
      })
      // console.log('this.shops', products, this.shops);
    })
  }
}
