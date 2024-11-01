import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProviderService } from './provider.service';
import Food from './food';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatIcon, ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  constructor(public P:ProviderService){}
  setPages(e:Event){ 
    this.P.category =(e.target as HTMLInputElement).value
  }
  onSubmit(adder:NgForm){
    let {amount, fTitle} =adder.value
    ,   newFood :Food ={ amount:amount ?amount :1, title:fTitle }
    this.P.addFood(newFood)
    adder.reset()
    // console.log(newFood);
  }
  onChange(i:number, e:Event){
    let {name, value} =e.target as HTMLInputElement
    ,   newValue =Number.isNaN(Number(value)) ?value :Number(value)
    ,   newFood ={ ...this.P.foods()[this.P.category][i], [name]:newValue}
    this.P.updateFood(i, newFood)
    // console.log( i, newFood );
  }
}
