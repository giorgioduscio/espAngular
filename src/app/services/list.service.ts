import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ListItem } from '../interfaces/list';

@Injectable({  providedIn: 'root'})
export class ListService {

  private url ="https://list-89d05-default-rtdb.europe-west1.firebasedatabase.app/todos"
  constructor(private http:HttpClient){}

  get(){
    return this.http.get<{[k:string]:ListItem}>(this.url +'.json')
  }
  add(newItem:ListItem){
    return this.http.post( this.url+'.json', newItem )
  }
  delete(key: string){
    return this.http.delete(`${this.url}/${key}.json`)
  }
  patch(key: string, newItem:ListItem){
    return this.http.patch(`${this.url}/${key}.json`, newItem)
  }
}