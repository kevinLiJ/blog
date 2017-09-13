import { Injectable } from '@angular/core';
import { Http, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

interface classObj{
    class_name:string
}

@Injectable()
export class ClassService {
    constructor(private _http: Http) {}
    private extractData(res) {
        let body = res.json();
        return body || {};
    }
    // 获取所有评论的信息
    getclass(): Observable < any > {
        return this._http.get('/class')
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
    // 获取所有文章的信息
    addclass(classObj: classObj): Observable < any > {
        return this._http.post('/class',classObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
}
