import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router'

@Injectable()
export class LoginGuard implements CanActivate {
    canActivate(){
        if(localStorage.getItem('isLogin') === 'true'){
            return true;
        }
        return false;
    }
}