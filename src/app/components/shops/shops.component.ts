import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { ShopsService } from '../../services/shops.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})

export class ShopsComponent {
  shops :any
  filter =''
  constructor (private shopsService: ShopsService){ 
      shopsService.getShops().subscribe(data =>{ 
        this.shops =data
        console.log('this.shops', this.shops);
      })
  }
}
