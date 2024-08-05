import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectRole, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL ="https://users-b9804-default-rtdb.europe-west1.firebasedatabase.app/users"
  constructor(private http: HttpClient) {}
  addUser(body: User){
    return this.http.post( this.usersURL+".json", body ) 
  }
  getUsers(){
    return this.http.get(this.usersURL+".json")
  }
  deleteUser(id: string |number){
    return this.http.delete(`${this.usersURL}/${id}.json`)
  }
  patchUser(id: string, body:User){
    return this.http.put(`${this.usersURL}/${id}.json`, body)
  }
}

 
 
