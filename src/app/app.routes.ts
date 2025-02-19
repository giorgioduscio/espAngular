import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent } from './pages/list/list.component';
import { HierarchyComponent } from './pages/hierarchy/hierarchy.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/login/access.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MessagesComponent } from './pages/chat/messages/messages.component';
import { buildSmartRouter } from './tools/buildSmartRouter';
import { Error404Component } from './pages/error404/error404.component';
import { CalcComponent } from './pages/calc/calc.component';
import { PersonalAreaComponent } from './pages/personalArea/personalArea.component';

export const { routes, smartRoutes } =buildSmartRouter([
  { path: 'home', component: HomeComponent },
  { path: 'error', component: Error404Component },
  { show:true, path: 'hierarchy', component: HierarchyComponent },
  { show:true, path: 'dashboard', component: DashboardComponent, auth:[0] },
  { show:true, path: 'list', component: ListComponent },
  { show:true, path: 'calc', component: CalcComponent },
  { path: 'user/:userKey', component: PersonalAreaComponent, auth:[] },

  // LOGIN
  { path: 'login', component: LoginComponent },
  { path: 'access', component: AccessComponent },
  // CHAT
  { show:true, path: 'chat', component: ChatComponent, auth:[] },
    { path: 'chat/:chatKey', component: MessagesComponent },
    
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
])