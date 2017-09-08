import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginStatusService } from '../service/loginStatus.service';

@Injectable()
export class EditArticleGuard implements Resolve<any>{

    constructor(private _loginStatusService: LoginStatusService){}

    resolve(router: ActivatedRouteSnapshot, State: RouterStateSnapshot){

        console.log(router);
        console.log(State)
        if(this._loginStatusService.getLoginStatus()){
            return true;
        }else{
            return false;
        }
        
    }
}