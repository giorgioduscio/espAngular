import { Component } from '@angular/core';
import { filterUser } from '../../pipes/filter-user.pipe';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    filterUser,
    FormsModule,
    NgFor, NgIf,
    NavbarComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  users :User[] |any[] =this.usersService.getUsers__()
  userKeys :string[] =Object.keys(this.users[0])
    .filter(key =>key!=='imageUrl'&&key!=="id")

  constructor(private usersService: UsersService){
    document.title ='Dashboard'
    
    console.log("users", this.users, this.userKeys);
  }
}
