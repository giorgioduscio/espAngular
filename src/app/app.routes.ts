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
import { buildSmartRouter } from './tools/buildSmartRouter';

export const { routes, smartRoutes } =buildSmartRouter([
  { path: 'home', component: HomeComponent },
  { show:true, path: 'hierarchy', component: HierarchyComponent },
  { show:true, path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { show:true, path: 'list', component: ListComponent },
  { path: 'logistic', component: LogisticComponent },

  // LOGIN
  { path: 'login', component: LoginComponent },
  { path: 'access', component: AccessComponent },
  // CHAT
  { show:true, path: 'chat', component: ChatComponent },
    { path: 'chat/:chatKey', component: MessagesComponent },
  // SHOPS
  { show:true, path: 'cart', component: CartComponent },
  { show:true, path: 'shops', component: ShopsComponent},
    { path: 'shops/:id', component: ProductsComponent },
    
  { path: '', redirectTo: '/home', pathMatch: 'full' },
])