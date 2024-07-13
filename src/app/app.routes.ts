import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SignalComponent } from './components/signal/signal.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './components/shops/products/products.component';

export const routes :Routes |any[] =[
    { show:true, path: 'home', component: HomeComponent },
    { show:true, path: 'signal', component: SignalComponent },
    { show:true, path: 'dashboard', component: DashboardComponent },
    { show:true, path: 'shops', component: ShopsComponent, 
        canActivate:[authGuard], canActivateChild:[authGuard],
    },
    { show:false, path: 'shops/:id', component: ProductsComponent },
    { show:false, path: '', redirectTo: '/home', pathMatch: 'full' }
];
