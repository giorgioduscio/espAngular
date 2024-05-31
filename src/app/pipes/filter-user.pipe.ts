import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'filterUser',
  standalone: true
})
export class filterUser implements PipeTransform {

  transform(users: User[], filter: string): User[] {
    if(!users) return users;
    return users.filter(item=> item.role.includes(filter))
  }

}
