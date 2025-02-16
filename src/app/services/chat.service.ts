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
    this.http.get<{[k:string]:Chat}>(this.url+".json").subscribe(res=>{
      if(res) this.chats.set(mapper(res))
      // console.log('getChat',this.chats(), res);
    })
  }
  addChat(newChat:Chat){
    this.http.post(this.url+".json", newChat).subscribe(r=>{
      this.getChats()
      setTimeout(()=>console.log('addChat',this.chats()[ this.chats().length-1 ]), 1000);
    })
  }
  deleteChat(key:string){
    this.http.delete(`${this.url}/${key}.json`).subscribe(r=>{
      this.getChats()
      setTimeout(()=>console.log('deleteChat',this.chats()), 1000);
    })
  }
  patchChat(chatKey:string, newChat:Chat){

    this.http.patch(`${this.url}/${chatKey}.json`,newChat).subscribe(r=>{
      this.getChats()
      setTimeout(()=>console.log('patchChat',this.chats()), 1000);
    })
  }


}
