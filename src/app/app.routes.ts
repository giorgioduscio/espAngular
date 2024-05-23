import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'chi-siamo', component: ChiSiamoComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
