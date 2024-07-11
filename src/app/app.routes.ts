import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SignalComponent } from './components/signal/signal.component';
import { authGuard } from './auth/auth.guard';

export const routes :Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'signal', component: SignalComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'shops', component: ShopsComponent, canActivate:[authGuard], canActivateChild:[authGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
