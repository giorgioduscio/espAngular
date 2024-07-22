import { Component } from '@angular/core';
import { filterUser } from '../../pipes/filter-user.pipe';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

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
  users :any[] =[]
  userKeys :any[] =[]
  constructor(private usersService: UsersService){
    this.usersService.getUsers().subscribe(data=> {
      this.users =data
      // MEMORIZZA SOLO LE CHIAVI CHE NON SONO OGGETTI
      this.userKeys =Object.keys(this.users[0])
        .filter(key =>typeof(this.users[0][key])!="object")
      // console.log("users", this.users, this.userKeys);
    })
  }
}
