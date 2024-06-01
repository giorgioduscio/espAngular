import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule, 
    NgIf, 
    NgFor, 
    NgSwitch, 
    NgSwitchCase, 
    NgSwitchDefault,
    NgStyle,
    
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy{



  isVisible=true;
  setIsVisible(){ this.isVisible= !this.isVisible }

  text='Invio';
  onClick(){
    this.text='Click';
  }

  oggi= Date.now()

  // SERVICE
  constructor(private homeService: HomeService){}
  ngOnInit(): void {
    console.log('serv', this.homeService.homeCards)
  }


  ngAfterContentChecked(): void {
    //console.log('ngAfterContentChecked')
  }
  ngAfterContentInit(): void {
    //console.log('ngAfterContentInit')
  }
  ngAfterViewChecked(): void {
    //console.log('ngAfterViewChecked')
  }
  ngAfterViewInit(): void {
    //console.log('ngAfterViewInit')
  }
  ngDoCheck(): void {
    //console.log('ngDoCheck')
  }
  ngOnDestroy(): void {
    //console.log('ngOnDestroy')
  }
}
