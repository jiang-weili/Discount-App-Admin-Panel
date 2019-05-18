import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiService {
    file: any;
    public domain = environment.apiURL;

    constructor(private http: Http, private httpClient: HttpClient, private authService: AuthService) { }

    get(uri, data) {
        const headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + this.authService.loadToken()
        });

        var params = new HttpParams();
        params = params.append('page', data.page);
        params = params.append('limit', data.limit);

        return this.httpClient.get(this.domain + uri, {headers: headers, params: params});
    }

    post(uri, data = {}) {
        const headers = new Headers({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + this.authService.loadToken()
        });
        return this.http.post(this.domain + uri, data, {headers: headers}).map(res => res.json());
    }

    delete(uri) {
        const headers = new Headers({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + this.authService.loadToken()
        });
        return this.http.delete(this.domain + uri, {headers: headers});
    }

    put(uri, data) {
        const headers = new Headers({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + this.authService.loadToken()
        });
        return this.http.put(this.domain + uri, data, {headers: headers}).map(res => res.json());
    }

    uploadFile(uri, file) {
        const headers = new Headers({
            'Content-Type':  'multipart/form-data',
            'Authorization': 'Bearer ' + this.authService.loadToken()
        });

        var data = new FormData();
        data.append('image', file);

        return this.http.post(this.domain + uri, data, {headers: headers}).map(res => res.json());
    }
}
