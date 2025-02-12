import { Routes } from "@angular/router"
import { authGuard } from "../auth/auth.guard"

export interface SmartRoute{
  path:string
  component?:any
  redirectTo?:string
  pathMatch?: 'full' |'prefix'
  canActivate?:any[]

  auth?:number[]
  show?:boolean
}

export function buildSmartRouter(newSmartRoutes: SmartRoute[]){
  const smartRoutes = newSmartRoutes.map(route => ({ ...route }))

  const routes: Routes = smartRoutes.map(route => {
    const newRoute = { ...route }
    if(newRoute.auth!==undefined) newRoute.canActivate =[authGuard]

    delete newRoute.auth;
    delete newRoute.show;
    return newRoute;
  });
  
  // console.log(smartRoutes, routes);
  return { smartRoutes, routes };
}