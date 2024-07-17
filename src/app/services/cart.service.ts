import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart :Product[] =[
    {id:111, title:'Arance', price:666, amount:2, imageUrl:'https://img.freepik.com/foto-premium/immagine-completa-di-frutti-di-arancia_1048944-864511.jpg?w=1060'},
    {id:222, title:'Caramelle', price:118, amount:1, imageUrl:'https://img.freepik.com/foto-gratuito/deliziosa-composizione-di-caramelle_23-2150897091.jpg?t=st=1721197789~exp=1721201389~hmac=244d2a7e7163811c11c1404b18993354f7bfad7cf5db94feb0490d95f547765e&w=1380'},
  ]

  getCart(){return this.cart}

  addElement(newProduct:Product){
    let isNewElement :boolean =true
    // SE ARRAY>0 FAI CONTROLLO
    if(this.cart.length>0){
      // SE L'ELEMENTO ESISTE GIA, AUMENTA QUANTITA'
      this.cart.map((product, i) =>{ //FIX
        if(product.id ===newProduct.id){
          isNewElement =false
          product.amount +=newProduct.amount
        }
      })
    } 
    //OPTIMIZE SE NUOVO ELEMENTO, FAI PUSH
    if(isNewElement) this.cart.push(newProduct)
  }

  deleteElement(index:number){this.cart.splice(index, 1)}
}
