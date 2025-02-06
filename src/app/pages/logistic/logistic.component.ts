import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProviderService } from './provider.service';
import LogisticElement from './Logistic';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-logistic',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatIcon, ],
  templateUrl: './logistic.component.html',
  styleUrl: './logistic.component.css'
})
export class LogisticComponent {
  constructor(public P:ProviderService){}
  setPages(e:Event){ 
    this.P.category =(e.target as HTMLInputElement).value
  }
  onSubmit(adder:NgForm){
    let {amount, fTitle} =adder.value
    ,   newFood :LogisticElement ={ amount:amount ?amount :1, title:fTitle }
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
