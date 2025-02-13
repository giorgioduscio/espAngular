import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
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
}
