import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { List } from '../interfaces/list';
import { mapper } from '../tools/mapper';

@Injectable({  providedIn: 'root'})
export class ListService {

  private url ="https://list-89d05-default-rtdb.europe-west1.firebasedatabase.app/todos"
  list =signal<List[]>([])
  constructor(private http:HttpClient){}

  get(){
    this.http.get(this.url +'.json').subscribe(res=>{
      this.list.set( mapper(res) )
      // console.log("get", this.list);
    })
  }
  add(newItem:List){
    this.http.post( this.url+'.json', newItem ).subscribe(res=>{
      this.get()
      console.log("add", res);
    })
  }
  delete(key: string){
    this.http.delete(`${this.url}/${key}.json`).subscribe(res=>{
      this.get()
      console.log("delete", res);
    })
  }
  patch(key: string, newItem:List){
    this.http.patch(`${this.url}/${key}.json`, newItem).subscribe(res=>{
      this.get()
      console.log("patch", res);
    })
  }
}