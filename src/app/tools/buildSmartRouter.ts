import { Routes } from "@angular/router"

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
    delete newRoute.auth;
    delete newRoute.show;
    return newRoute;
  });
  return { smartRoutes, routes };
}