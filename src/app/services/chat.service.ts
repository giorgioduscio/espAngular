import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat, Message } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url ='https://chat-d4bba-default-rtdb.europe-west1.firebasedatabase.app/chat'
  constructor(private http:HttpClient) { }

  getChat(){return this.http.get(this.url+".json")}
  addChat(body:Chat){return this.http.post(this.url+".json", body)}
  deleteChat(key:string){return this.http.delete(`${this.url}/${key}.json`)}

  getMessages(key:string){
    return this.http.get(`${this.url}/${key}.json`)}
  addMessage(key:string, body:Message){
    return this.http.post(`${this.url}/${key}/content.json`, body)}
}
