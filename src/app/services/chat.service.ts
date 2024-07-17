import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url ='https://chat-d4bba-default-rtdb.europe-west1.firebasedatabase.app/chat'
  constructor(private http:HttpClient) { }

  getChat(){return this.http.get(this.url+".json")}

  addChat(body:Chat){return this.http.post(this.url+".json", body)}
  deleteChat(id:string){return this.http.delete(`${this.url}/${id}.json`)}
}
