import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { ShopsService } from '../../services/shops.service';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    NgFor,
    NgIf,
    FormsModule,
    MatCardModule, 
    MatButtonModule,
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})

export class ShopsComponent {
  constructor (
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private usersService: UsersService,
  ){ 
      shopsService.getProducts()
        .subscribe(data=>console.log("shops:", data)),
      productsService.getProducts()
        .subscribe(data=>console.log("products:", data))
      usersService.getUsers()
        .subscribe(data=>console.log("users:", data)) 
  }
  products: Product[] =[];
  filter: string='';

  ngOnInit(): void {
    this.shopsService.getProducts().subscribe(data=> {
      this.products= data;
     })
  }

  handleEvent(event:String){
    console.log('event', event);
  }

  @Input() product!: Product;
  @Output() myEvent= new EventEmitter<string>
  emitEvent(){
    this.myEvent.emit("Hello world")
  }
}
