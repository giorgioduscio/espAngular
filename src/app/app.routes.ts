import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopsComponent } from './components/shops/shops.component';
import { LoginComponent } from './components/login/login.component';
import { SignalComponent } from './components/signal/signal.component';

export const routes :Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'signal', component: SignalComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shops', component: ShopsComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
