import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ListService } from '../../services/list.service';
import { ListItem } from '../../interfaces/list';
import { ParagraphPipe } from './paragraph.pipe';
import { mapper } from '../../tools/mapper';

@Component({
  selector: 'app-listService',
  standalone: true,
  imports: [FormsModule, NgFor, NavbarComponent, ParagraphPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent{
  constructor(public listService:ListService){
    document.title ='ListItem'
    this.onGet()
  }

  list :ListItem[] =[]
  onGet(){
    this.listService.get().subscribe(res=>{
      this.list =mapper(res)
    })
  }

  @ViewChild('formData') formData! :NgForm
  onAdd(formData:NgForm){
    let newItem ={
      complete: false,
      title: formData.value.title,
    }
    this.listService.add(newItem).subscribe(r=>{ 
      this.onGet()
      formData.reset()
    })
  }

  onDelete(index:number){
    const key =this.list[index].key
    this.listService.delete(key!).subscribe(r=> this.onGet())
  }
  
  onPatch(event:Event, index:number){
    const {value, id, checked} =(event.target as HTMLInputElement)
    const newField =id=='complete' ?checked :value
    const $id =id as keyof ListItem

    const key =this.list[index].key!
    const updateItem :any =this.list[index]
    updateItem[$id]= newField    

    this.listService.patch(key, updateItem).subscribe(r=> this.onGet())
  }
}
