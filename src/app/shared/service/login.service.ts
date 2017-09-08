import { Injectable } from '@angular/core';
import { Http, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

interface loginObj{
    userName: String,
    password: String
}

@Injectable()
export class LoginService {
    constructor(private _http: Http) {}
    private extractData(res) {
        let body = res.json();
        return body || {};
    }

    // 获取所有文章的信息
    login(loginObj: loginObj): Observable < any > {
        return this._http.post('/login',loginObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
}