import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { HomeService } from './home.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
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
    CommonModule,
    NavbarComponent
],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy{
  // NASCONDI CARD
  isVisible=true;
  setIsVisible(){ this.isVisible= !this.isVisible }

  // TWO WAY BUINDING
  text='Clear';
  onClick(){
    this.text='Clear';
  }
  @Output() sendData =new EventEmitter<string>()
  handleChange(){
    this.sendData.emit( this.text )
  }

  // FUNZIONI PIPE
  oggi= Date.now()

  // SERVICE
  constructor(private homeService: HomeService){
    document.title ='Home'
  }
  cards =this.homeService.homeCards
  
  
  
  ngOnInit(): void {
    //console.log('ngOninit')
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