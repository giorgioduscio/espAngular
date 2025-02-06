import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { mapper } from '../../tools/mapper';
import LogisticElement, { FoodProvider } from './Logistic';

@Injectable({  providedIn: 'root'})
export class ProviderService {
  private url ='https://list-89d05-default-rtdb.europe-west1.firebasedatabase.app/foods'
  category ='Stanzino'
  foods =signal<FoodProvider>({})
  constructor(private http:HttpClient){ this.getFood() }

  getFood(){
    this.http.get(`${this.url}.json`).subscribe((res:any)=>{
      if(res) this.foods.set(res)
      Object.keys(this.foods()).map(key=>{
        this.foods()[key] =mapper(this.foods()[key])
      })
      // console.log(this.foods());
    })
  }
  addFood(newFood:LogisticElement){
    this.http.post(`${this.url}/${this.category}.json`, newFood).subscribe((res:any)=>{
      // this.foods()[this.category].push(newFood)
      this.getFood()
      console.log('add', this.foods()[this.category][this.foods()[this.category].length -1]);
    })
  }
  deleteFood(index:number){
    let keyFood =this.foods()[this.category][index].key!
    this.http.delete(`${this.url}/${this.category}/${keyFood}.json`).subscribe((res:any)=>{
      console.log('delete', this.foods()[this.category][index]);
      // this.foods()[this.category].splice(index, 1)
      this.getFood()
    })
  }
  updateFood(index:number, newFood:LogisticElement){
    let keyFood =this.foods()[this.category][index].key!
    this.http.patch(`${this.url}/${this.category}/${keyFood}.json`, newFood).subscribe((res:any)=>{
      this.foods()[this.category][index] =newFood
      // console.log('update', this.foods()[this.category][index]);
      this.getFood()
    })
  }

}
