import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../interfaces/product';
import { ProductComponent } from '../product/product.component';


@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    ProductComponent,
    MatCardModule, 
    MatButtonModule,
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})

export class ShopsComponent {
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

  @Input() product!: Product;
  @Output() myEvent= new EventEmitter<string>
  emitEvent(){
    this.myEvent.emit("Hello world")
  }
}
