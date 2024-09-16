import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { SelectRole, User } from '../interfaces/user';
import { mapper } from '../tools/mapper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url ="https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users"
  constructor(private http: HttpClient) {}
  users =signal<User[]>([])

  getUsers(){
    this.http.get(this.url +'.json').subscribe(((res:any)=>{
      this.users.set( mapper(res) )
    }))
  }
  addUser(body:User){
    this.http.post( this.url+".json", body ).subscribe((res:any)=>{
      this.users().push( {...body, key: res.name} ) 
      console.log("addUser",this.users()[ this.users().length-1 ]);
    })  
  }
  deleteUser(key:string){
    this.http.delete(`${this.url}/${key}.json`).subscribe((res:any)=>{
      this.users.set(this.users() .filter(user=>user.key!=key))
    })
    console.log("deleteUser",this.users());
  }
  patchUser(key:string, body:User){
    delete body.key
    this.http.put(`${this.url}/${key}.json`, body).subscribe((res:any)=>{
      let index =this.users() .indexOf(body)
      this.users()[index]=res
      console.log("patchUser",this.users()[index]);
    })
  }
}

 
 
