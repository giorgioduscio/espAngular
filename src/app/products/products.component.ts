import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { Product } from './../interfaces/product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    ProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  products: Product[]=[];
  filter: string='';

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data=> {
      this.products= data;
     })
    throw new Error('Method not implemented.');
  }

  constructor (private productsService: ProductsService){ }
  handleEvent(event:String){
    console.log('event', event);
    
  }

}
