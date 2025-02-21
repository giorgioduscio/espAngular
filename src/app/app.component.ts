import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
  ],
  template: `<router-outlet />`,
})
export class AppComponent {
  title ='ggg-ng';
  onCatchData(value: string){
    this.title =value
  }
  
}
