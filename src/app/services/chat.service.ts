import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Chat, Message } from '../interfaces/chat';
import { mapper } from '../tools/mapper';

@Injectable({  providedIn: 'root' })
export class ChatService {
  private url ='https://chat-d4bba-default-rtdb.europe-west1.firebasedatabase.app/chat'
  constructor(private http:HttpClient){ }
  chats =signal<Chat[]>([])

  getChats(){
    this.http.get(this.url+".json").subscribe((res:any)=>{
      if(res) this.chats.set(mapper(res))
      // console.log('getChat',this.chats(), res);
    })
  }
  addChat(body:Chat){
    this.http.post(this.url+".json", body).subscribe((res:any)=>{
      this.chats() .push({...body, key:res.name})
      console.log( 'addChat',this.chats()[ this.chats().length-1 ] );
    })
  }
  deleteChat(key:string){
    this.http.delete(`${this.url}/${key}.json`).subscribe((res:any)=>{
      this.chats.set( this.chats().filter(chat=>chat.key!==key) )
    })
  }
  patchChat(key:string, updatedChat:Chat){
    this.http.patch(`${this.url}/${key}.json`,updatedChat).subscribe((res:any)=>{
      // this.chats.set( this.chats().filter(chat=>chat.key!==key) )
      console.log(res);
      
    })
  }


}
