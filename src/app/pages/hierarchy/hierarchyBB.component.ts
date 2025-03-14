import { Component, effect } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HierarchyService } from './hierarchy.service';
import { ListItem } from '../../interfaces/list';
import { NgFor } from '@angular/common';
import { randomString } from '../../tools/randomCompiler';

@Component({
  selector: 'app-hierarchyBB',
  standalone: true,
  imports: [ NgFor, NavbarComponent, ],
  // FIX HTML
  template: `
    <main class="hierarchy">
      <header>
        <button class="btn btn-outline-success bi bi-plus-lg" (click)="onAdd()"></button>
        <h2>BB</h2>
      </header>

      <div class="grid">@for (item of localList; track item; let i=$index){ 
        <button class="btn btn-outline-danger bi bi-trash3-fill" (click)="onDelete(item.key!)"></button>
        <input class="form-check-input" 
          type="checkbox" 
          name="complete"
          [checked]="item.complete" 
          (change)="onPatch(item,$event)"
        >
        <input class="form-control" 
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
  localList :ListItem[] =[]
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
  onPatch(item:ListItem, e:Event){
    const {name, value, checked} =e.target as HTMLInputElement
    const newValue =name==='title' ?value :checked
    this.hierarchyService.patchTodo(item.key!, {
      ...item, [name]:newValue
    })
  }
}