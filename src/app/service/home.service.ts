import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  homeCards=[
    {title:"Usabilità", isVisible:true, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
    {title:"Efficenza", isVisible:true, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
    {title:"Adattabilità", isVisible:false, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit"},
  ]
}
