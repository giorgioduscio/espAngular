import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopsComponent } from './components/shops/shops.component';
import { authGuard } from './auth/auth.guard';
import { ProductsComponent } from './components/shops/products/products.component';
import { ListComponent } from './components/list/list.component';
import { CartComponent } from './components/shops/cart/cart.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessagesComponent } from './components/chat/messages/messages.component';
import { LoginComponent } from './components/login/login.component';
import { HierarchyComponent } from './components/hierarchy/hierarchy.component';
import { AccessComponent } from './components/login/access/access.component';
import { LogisticComponent } from './components/logistic/logistic.component';

export const routes :Routes |any[] =[
    { show:false, path: 'Home', component: HomeComponent },
    { show:true, path: 'Hierarchy', component: HierarchyComponent },
    { show:true, path: 'Dashboard', component: DashboardComponent, canActivate:[authGuard] },
    { show:true, path: 'List', component: ListComponent },
    { show:true, path: 'Logistic', component: LogisticComponent },
    // LOGIN
    { show:false, path: 'Login', component: LoginComponent },
    { show:false, path: 'Access', component: AccessComponent },
    // CHAT
    { show:true, path: 'Chat', component: ChatComponent },
        { show:false, path: 'Chat/:chatKey', component: MessagesComponent },
    // SHOPS
    { show:true, path: 'Cart', component: CartComponent },
    { show:true, path: 'Shops', component: ShopsComponent},
        { show:false, path: 'Shops/:id', component: ProductsComponent },
        
    { show:false, path: '', redirectTo: 'Home', pathMatch: 'full' }
];
