import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatIcon } from '@angular/material/icon';
import { ListService } from '../../services/list.service';
import { List } from '../../interfaces/list';

@Component({
  selector: 'app-listService',
  standalone: true,
  imports: [FormsModule, NgFor, MatIcon, NavbarComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent{
  @ViewChild('formData') formData! :NgForm
  constructor(public listService:ListService){
    document.title ='List'
    listService.get()
    // effect(()=>{ console.log('list', listService.list()) })
  }

  onAdd(formData:NgForm){
    this.listService.add({
      complete: false,
      title: formData.value.title,
    })
    formData.reset()
  }

  onDelete(index:number){
    const key =this.listService.list()[index].key
    this.listService.delete(key!)
  }

  onPatch(event:Event, index:number){
    const {value, id, checked} =(event.target as HTMLInputElement)
    const newField =id=='complete' ?checked :value
    const $id =id as keyof List

    const key =this.listService.list()[index].key!
    const updateItem :any =this.listService.list()[index]
    updateItem[$id]= newField    

    this.listService.patch(key, updateItem)
  }
}
