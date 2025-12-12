import { HierarchyBComponent } from "./hierarchyB.component";
import { randomCompiler } from '../../tools/randomCompiler';
import { NgFor } from "@angular/common";
import { Component, effect } from "@angular/core";
import { ListItem } from "../../interfaces/list";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { HierarchyService } from "./hierarchy.service";
import { HierarchyAComponent } from "./hierarchyA.component";

@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [ NgFor, NavbarComponent, HierarchyAComponent, HierarchyBComponent],
  // FIX HTML
  template: `
  <article>
    <app-navbar></app-navbar>
    <div>

      <main class="hierarchy">
        <header>
          <button class="btn btn-outline-success bi bi-plus-lg" (click)="onAdd()"></button>
          <h2>Main</h2>
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

        <div class="childs">
          <app-hierarchyA></app-hierarchyA>
          <app-hierarchyB></app-hierarchyB>
        </div>
      </main>

    </div>
  </article>
  `,
  styleUrl: './hierarchy.component.css',
})
// OPTIMIZE TYPESCRIPT
export class HierarchyComponent{
  localList :ListItem[] =[]
  // TODO GET
  constructor(private hierarchyService:HierarchyService){
    document.title=`Hierarchy`
    hierarchyService.getTodo()
    effect(()=>{
      this.localList =hierarchyService.list()
      // console.log("localList",this.localList) 
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
      title: randomCompiler.string()
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