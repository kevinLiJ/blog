import { Injectable } from '@angular/core';
import { Http, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const ARTICLES_URL = '/articles';
const COLLECTION_URL = '/collections';

interface PaginationAjaxData{
    start: Number,
    end: Number
}

interface articleInfoObj{
    content:string,
    md_content:string,
    creat_time:string,
    last_mod_time:string,
    title:string
}

interface updateArticleInfoObj{
    content:string,
    md_content:string,
    last_mod_time:string,
    title:string
}

@Injectable()
export class ArticlesService {
    constructor(private _http: Http) {}
    private extractData(res) {
        let body = res.json();
        return body || {};
    }

    // 获取所有文章的信息
    getArticles(obj: PaginationAjaxData): Observable < any > {
        return this._http.get(ARTICLES_URL + '?start=' + obj.start + '&end=' + obj.end)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 添加文章
    addArticle(contactInfoObj:articleInfoObj): Observable < any[] > {
        return this._http.post(ARTICLES_URL, contactInfoObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 根据path参数获取某一个文章的信息
    getArticle(contactId): Observable < any > {
        return this._http.get(ARTICLES_URL + '/' + contactId)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 根据path参数更新某一个文章的信息
    updateArticle(contactId, articleInfoObj:updateArticleInfoObj): Observable < any[] > {
        return this._http.put(ARTICLES_URL + '/' + contactId, articleInfoObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 收藏文章(根据restfulAPI，本应该使用patch，但是跨域不允许使用此请求方法)
    likeArticle(contactId): Observable < any[] > {
        return this._http.patch(ARTICLES_URL + '/' + contactId + '/like','')
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
}