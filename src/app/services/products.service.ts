import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url ="https://dummyjson.com/products"
  realtimeProducts :WritableSignal<Product[]> =signal([])

  constructor(private http: HttpClient) {
    // TODO INIZIALIZZAZIONE
    this.http.get(this.url).subscribe((r:any)=>{
      const products :Product[] =r.products
      this.realtimeProducts.set(products)
    })
    // TODO AGIORNAMENTO
    effect(()=>{
      console.log(
        "ProductsService", 
        this.realtimeProducts()
      )
    })
  }

  getProducts(){return this.http.get <any> (this.url)}
}
