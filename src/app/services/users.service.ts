import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { mapper } from '../tools/mapper';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient){
    this.getUsers()
  }
  
  private url ="https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users"
  users =signal<User[]>([])
  private getUsers(){
    this.http.get<{[k:string]:User}>(this.url +'.json').subscribe((res=>{
      this.users.set( mapper(res) )
      // console.log("get",this.users());
    }))
  }
  addUser(user:User){
    this.http.post( this.url+".json", user ).subscribe(res=>{
      this.getUsers()

      setTimeout(()=> console.log("addUser",this.users()[ this.users().length-1 ]), 1000);
    })  
  }
  deleteUser(i:number){
    let key =this.users()[i].key
    this.http.delete(`${this.url}/${key}.json`).subscribe(res=>{
      this.getUsers()
      console.log("deleteUser",this.users());
    })
  }
  patchUser(i:number, user:User){
    let key =this.users()[i].key
    this.http.put(`${this.url}/${key}.json`, user).subscribe(res=>{
      this.getUsers()

      setTimeout(()=> console.log("patchUser", this.users()[i]), 1000);
    })
  }
}

 
 
