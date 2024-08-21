import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    NgFor, NgIf,
    NavbarComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent{
  users! :User[] |any[]
  userKeys! :string[]

  constructor(private usersService: UsersService){
    document.title ='Dashboard'

    this.usersService.getUsers().subscribe((responce:any)=>{
        this.users =Object.keys(responce) .map(key=>{
          responce[key]["firebaseId"]=key
          return responce[key]
        })
        
        this.userKeys =Object.keys(this.users[0])
          .filter(key =>key!=='imageUrl'&&key!=="id")
        // console.log("users", this.users, );
      })
    
  }
}
