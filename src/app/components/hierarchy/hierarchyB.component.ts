import { Component, effect } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HierarchyService } from './hierarchy.service';
import { List } from '../../interfaces/list';
import { randomString } from '../chat/autocomp';
import { NgFor } from '@angular/common';
import { HierarchyBBComponent } from "./hierarchyBB.component";

@Component({
  selector: 'app-hierarchyB',
  standalone: true,
  imports: [NgFor, NavbarComponent, HierarchyBBComponent],
  // FIX HTML
  template: `
    <main class="hierarchy">
      <h2>B</h2>

      <div class="childs">
        <app-hierarchyBB></app-hierarchyBB>
        <main></main>
      </div>
    </main>
  `,
  styleUrl: './hierarchy.component.css',
})
// OPTIMIZE TYPESCRIPT
export class HierarchyBComponent{
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