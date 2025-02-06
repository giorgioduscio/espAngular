import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { ListComponent } from './pages/list/list.component';
import { HierarchyComponent } from './pages/hierarchy/hierarchy.component';
import { LogisticComponent } from './pages/logistic/logistic.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/login/access/access.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MessagesComponent } from './pages/chat/messages/messages.component';
import { CartComponent } from './pages/shops/cart/cart.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ProductsComponent } from './pages/shops/products/products.component';

export const routes :Routes |any[] =[
  { show:false, path: 'Home', component: HomeComponent },
  { show:true, path: 'Hierarchy', component: HierarchyComponent },
  { show:true, path: 'Dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { show:true, path: 'List', component: ListComponent },
  { show:false, path: 'Logistic', component: LogisticComponent },

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
    
  { show:false, path: '', redirectTo: '/Home', pathMatch: 'full' }
];
