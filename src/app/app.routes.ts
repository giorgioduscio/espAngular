import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SignalComponent } from './components/signal/signal.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './components/shops/products/products.component';

export const routes :Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'signal', component: SignalComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'shops', component: ShopsComponent, 
        canActivate:[authGuard], canActivateChild:[authGuard],
    },
    { path: 'shops/:id', component: ProductsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
