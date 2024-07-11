import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL ="https://jsonplaceholder.typicode.com/users"
  constructor(private http: HttpClient) {}

  getUsers(){return this.http.get <any[]> (this.usersURL)}
}
