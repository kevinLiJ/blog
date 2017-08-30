import { Injectable } from '@angular/core';
import { Http, RequestOptions, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const CONTACTS_URL = '/contacts';
const COLLECTION_URL = '/collections';

@Injectable()
export class ContactService {
    constructor(private _http: Http) {}
    private extractData(res) {
        let body = res.json();
        return body || {};
    }

    // 获取所有联系人的信息
    getContacts(): Observable < any[] > {
        return this._http.get(CONTACTS_URL)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 添加联系人
    addContact(contactInfoObj): Observable < any[] > {
        return this._http.post(CONTACTS_URL, contactInfoObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 根据path参数获取某一个联系人的信息
    getContact(contactId): Observable < any[] > {
        return this._http.get(CONTACTS_URL + '/' + contactId)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 根据path参数更新某一个联系人的信息
    updateContact(contactId, contactInfoObj): Observable < any[] > {
        return this._http.put(CONTACTS_URL + '/' + contactId, contactInfoObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 获取所有收藏联系人的信息
    getCollections(): Observable < any[] > {
        return this._http.get(COLLECTION_URL)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }

    // 收藏联系人(根据restfulAPI，本应该使用patch，但是跨域不允许使用此请求方法)
    collectContact(contactId, isCollectObj): Observable < any[] > {
        return this._http.put(CONTACTS_URL + '/' + contactId + '/collect', isCollectObj)
            .map(this.extractData)
            .catch(error => Observable.throw(error.message));
    }
}