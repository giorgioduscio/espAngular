import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectRole, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersURL ="https://jsonplaceholder.typicode.com/users"
  constructor(private http: HttpClient) {}
  getRemoteUsers(){return this.http.get <any[]> (this.usersURL)}


  private users :User[] =[
    {
      id: 123,
      username: 'procioneSupremo',
      email: 'procioneSupremo@gmail',
      role: SelectRole.ADMIN,
      imageUrl: "https://img.freepik.com/foto-premium/un-gruppo-di-lemuri-cattas-in-natura_946696-3416.jpg?w=1380",
    },
    {
      id: 345,
      username: 'riccioCurioso',
      email: 'riccioCurioso@gmail',
      role: SelectRole.WRITER,
      imageUrl: "https://img.freepik.com/foto-premium/ritratto-ravvicinato-di-racoon_1037680-36274.jpg?w=826",
    },
    {
      id: 678,
      username: 'lemurePuzzolente',
      email: 'lemurePuzzolente@gmail',
      role: SelectRole.USER,
      imageUrl: "https://img.freepik.com/vettori-premium/gruppo-di-raggi-del-mare-che-nuotano-sull-oceano-vettore_689711-63.jpg?w=826",
    },
  ]

  getUsers(){return this.users}
  addUser(body:any){this.users.push(body)}
}

 
 
