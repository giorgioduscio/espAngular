import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css',
})
export class CalcComponent {
  num1$ = new Subject<number>();
  operator$ = new Subject<string>();
  num2$ = new Subject<number>();
  result$: Observable<number>;

  constructor() {
    this.result$ = combineLatest([this.num1$, this.operator$, this.num2$])
      .pipe(
        map(([num1, operator, num2]) => {
          switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return num1 / num2;
            default:  return 0;
          }
        })
      );
  }
  onChange(e:Event){
    let {value, type, id}=e.target as HTMLInputElement
    let newValue =type==='number' ?Number(value) :value
    let dinamic =id as keyof this
    // @ts-ignore
    this[dinamic].next(newValue)
  }


  // TUTORIAL RXJS
  // rende il valore rxjs
  users$ =of<LocUser[]>([
    { name:'mario', isLogged:true },
    { name:'marta', isLogged:true },
    { name:'carlo', isLogged:true },
  ])
  // variabile derivata dalla prima
  usersSex$ =this.users$.pipe(map(users=>
    users.map(user=> user.name.endsWith('o') ?'male' :'female' )
  ))
  // variabile clone, solo se isLogged sono tutti veri
  filteredUsers$ =this.users$.pipe(filter(users=>
    users.every(user=> user.isLogged),
    switchMap(users => of(users))
  ))
  // oggetto che unisce le tre variabili precedenti
  data$ =combineLatest([this.users$, this.usersSex$, this.filteredUsers$]).pipe(
    map(([users, sexs, filtered])=> ({ users, sexs, filtered }) ),
    tap(data => console.log('risultati', data)) 
  )

  userRxjs$ =new BehaviorSubject<LocUser|null>(null)
  ngOnInit(): void {
    this.userRxjs$.subscribe(data=>{
      console.log('userRxjs', data)
    })
    setTimeout(() => {
      this.userRxjs$.next({name:'edoardo', isLogged:false})
    }, 2000);
  }
}
interface LocUser{
  name:string
  isLogged:boolean
}