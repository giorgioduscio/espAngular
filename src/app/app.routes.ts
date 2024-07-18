import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopsComponent } from './components/shops/shops.component';
import { SignalComponent } from './components/signal/signal.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './components/shops/products/products.component';
import { ListComponent } from './components/list/list.component';
import { CartComponent } from './components/shops/cart/cart.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes :Routes |any[] =[
    { show:false, path: 'Home', component: HomeComponent },
    { show:true, path: 'Signal', component: SignalComponent },
    { show:true, path: 'Dashboard', component: DashboardComponent },
    { show:true, path: 'List', component: ListComponent },
    { show:true, path: 'Chat', component: ChatComponent },
    
    { show:true, path: 'Cart', component: CartComponent },
    { show:true, path: 'Shops', component: ShopsComponent, 
        canActivate:[authGuard], canActivateChild:[authGuard],
    },
    { show:false, path: 'Shops/:id', component: ProductsComponent },
    { show:false, path: '', redirectTo: 'Home', pathMatch: 'full' }
];
