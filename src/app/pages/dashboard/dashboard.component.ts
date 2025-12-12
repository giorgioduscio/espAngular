import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RolesValues, User } from '../../interfaces/user';
import { ParagraphPipe } from '../list/paragraph.pipe';
import inputType from '../../tools/inputType';
import fieldsFilter from '../../tools/fieldsFilter';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ FormsModule, NgFor, NgIf, NavbarComponent, ParagraphPipe, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent{
  constructor(public usersService: UsersService){
    document.title ='Dashboard'
    usersService.$users.subscribe((res)=>{
      if(res.length){ 
        this.users =res
        this.userKeys =Object.keys(res[0])
        .filter(k=>k!=='key' && k!=='password') 
        .map(k=>k as keyof User)
      }  
      // console.log(this.userKeys, this.users);
    })
  }

  users :User[] =[]
  userKeys :(keyof User)[] |undefined
  rolesValues =[...RolesValues]
  it =inputType
  onDelete(i:number){
    if(confirm('Cancellare utente?')) this.usersService.deleteUser(i)
  }
  onChange(i:number, key:keyof User, e:Event){
    const {value, type, checked} =e.target as HTMLInputElement
    const newValue =type==='checkbox' ?checked :
                    !isNaN(Number(value)) ?Number(value) :
                    value
    const newUser ={ ...this.users[i], [key]:newValue }   

    // se modifichi una mail ma senza @, non fa la chiamata
    if(typeof newValue==='string'){
      if(type==='email' &&!newValue.includes('@')
      ) alert("Email non valida. Inserire '@'.")
      else this.usersService.patchUser(i, newUser)
    }
  }

  // VISUALIZZAZIONE FILTRATA
  filter=''
  show(i:number){
    let {id, username, email} =this.users[i]
    return fieldsFilter({ id, username, email }, this.filter)
  }
}
