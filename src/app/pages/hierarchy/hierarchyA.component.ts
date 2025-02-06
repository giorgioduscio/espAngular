import { Component, effect } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HierarchyService } from './hierarchy.service';
import { List } from '../../interfaces/list';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { randomString } from '../../tools/randomCompiler';

@Component({
  selector: 'app-hierarchyA',
  standalone: true,
  imports: [ MatIcon, NgFor, NavbarComponent, ],
  styleUrl: './hierarchy.component.css',
  // FIX HTML
  template: `
    <main class="hierarchy">
      <header>
        <h2>A</h2>
        <button class="btn btn-outline-success" (click)="onAdd()"><mat-icon>add</mat-icon></button>
      </header>

      <div class="grid">@for (item of localList; track item; let i=$index){ 
        <button class="btn btn-outline-danger" (click)="onDelete(item.key!)"><mat-icon>delete</mat-icon></button>
        <input class="form-check-input" 
          type="checkbox" 
          name="complete"
          [checked]="item.complete" 
          (change)="onPatch(item,$event)"
        >
        <input class="form-control text-bg-dark" 
          type="text" 
          name="title"
          [value]="item.title"
          (change)="onPatch(item,$event)"
        >
      }</div>

    </main>
  `,
})
// OPTIMIZE TYPESCRIPT
export class HierarchyAComponent{
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