import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  animals :Animals[] =[
    {
      name: 'Cane',
      height: 50,
      domesticable: true
    },
    {
      name: 'Gatto',
      height: 30,
      domesticable: true
    },
    {
      name: 'Pellicano',
      height: 100,
      domesticable: false
    },
  ]

  
}
export interface Animals{ name:string, height:number, domesticable:boolean }