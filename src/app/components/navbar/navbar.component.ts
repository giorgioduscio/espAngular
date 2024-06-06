import { Component, Input, OnInit, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { routes } from './../../app.routes';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
  RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  constructor(
    // private productService :ProductService,
    private authService :AuthService
  ){}

  // ACCOUNT
  token:string |null ='';
  ngOnInit(): void {
    this.authService.token$.subscrive((token :any)=>{
      this.token =token
    })
    throw new Error('Method not implemented.');
  }
  logout(){
    this.authService.logout()
  }


  @Input() title:any

  // DROPDOWN
  dropdown =false
  dropdown_f(e:any){
    if(e.target.className =="dropdownButton") {
      const div =e.target.children[0]
      console.log("e", div);

      if (div.style.display =="none") div.style.display =="flex"
      if (div.style.display =="flex") div.style.display =="none"
    }  
  }
}

console.log("router", routes)