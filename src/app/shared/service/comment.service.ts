import { Injectable } from '@angular/core';
import { Http, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

interface commentObj{
    article_id: Number,
    comment_id: Number|null,
    comment:string,
    creat_time:string
}

@Injectable()
export class CommentService {
    constructor(private _http: Http) {}
    private extractData(res) {
        let body = res.json();
        return body || {};
    }
    // 获取所有评论的信息
    getComment(articleId:Number): Observable < any > {
        return this._http.get('/comment/' + articleId)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
    // 获取所有文章的信息
    addComment(commentObj: commentObj): Observable < any > {
        return this._http.post('/comment',commentObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
}
