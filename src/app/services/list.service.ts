import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../interfaces/list';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private url ="https://list-89d05-default-rtdb.europe-west1.firebasedatabase.app/todos"
  constructor(private http:HttpClient){}

  addTodo(body: List){
    return this.http.post( this.url+".json", body ) 
  }
  getTodo(){
    return this.http.get(this.url+".json")
  }
  deleteTodo(id: string|number){
    return this.http.delete(`${this.url}/${id}.json`)
  }
  patchTodo(id: string, body:List){
    return this.http.put(`${this.url}/${id}.json`, body)
  }}
