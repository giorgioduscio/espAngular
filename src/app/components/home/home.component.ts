import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, 
    NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault,
    NgStyle
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy{

  cards=[
    {title:"Usabilità", isVisible:true, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
    {title:"Efficenza", isVisible:true, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
    {title:"Adattabilità", isVisible:false, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
  ]

  isVisible=true;
  setIsVisible(){ this.isVisible= !this.isVisible }

  text='Invio';
  onClick(){
    this.text='Click';
  }

  stringa='aaa'

  constructor(){
    //console.log('constructor')
  }
  ngOnInit(): void {
    //console.log('ngOnInit')
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
