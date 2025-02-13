import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { ListItem } from '../../interfaces/list';
import { mapper } from '../../tools/mapper';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  private url ="https://list-89d05-default-rtdb.europe-west1.firebasedatabase.app/todos"
  list =signal<ListItem[]>([])
  constructor(private http:HttpClient){
    effect(()=>{ 
      // console.log("service",this.list()) 
    })
  }

  addTodo(body: ListItem){
    this.http.post( this.url+".json", body ).subscribe((res:any)=>{
      this.list().push( {...body, key: res.name} ) 
    })
  }
  getTodo(){
    this.http.get(this.url+".json").subscribe((res:any)=>{
      this.list.set( mapper(res) )
    })
  }
  deleteTodo(key: string){
    this.http.delete(`${this.url}/${key}.json`).subscribe((res:any)=>{
      this.list.set(this.list() .filter(item=>item.key!=key))
    })
  }
  patchTodo(key: string, body:ListItem){
    this.http.put(`${this.url}/${key}.json`, body).subscribe((res:any)=>{
      let index =404
      this.list() .map((item,i)=>{item.key===key ?index=i :404})
      this.list()[index]=res
    })
  }
}