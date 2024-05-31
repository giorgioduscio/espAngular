import { Component } from '@angular/core';
import users from '../../datas/users';
import { User } from '../../interfaces/user';
import { filterUser } from '../../pipes/filter-user.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    filterUser,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  users:User[]= users;
  filter:string= ""
}
