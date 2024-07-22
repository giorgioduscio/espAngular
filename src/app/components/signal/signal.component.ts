import { NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { NavChatComponent } from "../chat/nav-chat/nav-chat.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NavChatComponent,
    NavbarComponent
],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
})

export class SignalComponent{
  signalString :WritableSignal<string>=signal("Signal")
  
  // SET
  setSignal(event:Event, staticValue:string =""){
    staticValue===""
      ? this.signalString.set((event.target as HTMLInputElement).value)
      : this.signalString.set(staticValue)
  }
  // UPDATE
  updateSignal(event:any){
    const newValue =event.target.value
    this.signalString.update(value =>value  +newValue)
  }
  // EFFECT
  constructor() {
    effect(() => {
      console.log(`change`, this.signalString());
    });
  }
  // COMPUTED
  computedSignal =computed(()=>{
    console.log(`computed`, this.signalString());
    return this.signalString() ==="Signal"
  })

  
  signalPeople =signal<Person[]>([
    {id:1, name:"Aldo", online:true},
    {id:2, name:"Barbara", online:false},
    {id:3, name:"Carlo", online:true},
  ])
  deletePerson(personToDelete:Person){
    this.signalPeople.update(people=>
      people.filter(p=> p.id !==personToDelete.id)
    )
  }
  addPerson(event:Event){
    let inputValue =(event.target as HTMLInputElement).value
    const newPerson :Person ={
      id: this.signalPeople().length +1,
      name: inputValue,
      online: false
    }
    this.signalPeople.update(people => [...people, newPerson])
    inputValue =''
  }
}

interface Person{
  id: number,
  name: string,
  online: boolean,
}