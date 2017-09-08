import { Injectable } from '@angular/core';

@Injectable()
export class LoginStatusService {

    getLoginStatus(){
        return localStorage.getItem('isLogin') === 'true';
    }

}