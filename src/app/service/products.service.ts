import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL='https://server-node-igna.vercel.app/shops';

  constructor(private http:HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get <any[]> (this.apiURL)
  }
}
