import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any>{
    canDeactivate(component:any, router: ActivatedRouteSnapshot, State: RouterStateSnapshot){
        console.log(component)
        // console.log(co)
        if(component.isLogin === false){
            
        }
        return true;
    }
}