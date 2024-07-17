import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgFor,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent{
  id :number =1
  brand :any
  products :any[] =[]

  constructor(private productsService:ProductsService, private route: ActivatedRoute) {
    // VALORE URL
    this.route.params.subscribe(params => {
      this.id =Number(params['id'])
    });


    // NOME BRAND
    productsService.getProducts().subscribe(r=>{
      r.products.map((product:any)=>{ 
        if(product.id==this.id) this.brand ={
          id: this.id, 
          title: product.brand, 
          description: product.description, 
          imageUrl: product.images[0],
        }
        if(product.id==this.id ||product.id%this.id==1) this.products.push(product)
      })
    })
  }
}
