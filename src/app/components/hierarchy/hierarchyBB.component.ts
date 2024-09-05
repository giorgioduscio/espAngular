import { Component, effect } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HierarchyService } from './hierarchy.service';
import { List } from '../../interfaces/list';
import { randomString } from '../chat/autocomp';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-hierarchyBB',
  standalone: true,
  imports: [ MatIcon, NgFor, NavbarComponent, ],
  // FIX HTML
  template: `
    <main class="hierarchy">
      <h2>BB</h2>
      <button (click)="onAdd()" class="round"><span class="icon">+</span> add</button>

      <div class="box">@for (item of localList; track item; let i=$index){ 
        <button (click)="onDelete(item.key!)"><mat-icon>delete</mat-icon></button>
        <input 
          type="checkbox" 
          name="complete"
          [checked]="item.complete" 
          (change)="onPatch(item,$event)"
        >
        <input 
          type="text" 
          name="title"
          [value]="item.title"
          (change)="onPatch(item,$event)"
        >
      }</div>

    </main>
  `,
  styleUrl: './hierarchy.component.css',
})
// OPTIMIZE TYPESCRIPT
export class HierarchyBBComponent{
  localList :List[] =[]
  // TODO GET
  constructor(private hierarchyService:HierarchyService){
    document.title=`Hierarchy`
    hierarchyService.getTodo()
    effect(()=>{
      this.localList =hierarchyService.list()
    //   console.log("localList",this.localList) 
    })
  }
  // TODO DELETE
  onDelete(key:string){
    this.hierarchyService.deleteTodo(key)
  }
  // TODO POST
  onAdd(){
    this.hierarchyService.addTodo({
      complete: false,
      title: randomString()
    })
  }
  // TODO PATCH
  onPatch(item:List, e:Event){
    const {name, value, checked} =e.target as HTMLInputElement
    const newValue =name==='title' ?value :checked
    this.hierarchyService.patchTodo(item.key!, {
      ...item, [name]:newValue
    })
  }
}