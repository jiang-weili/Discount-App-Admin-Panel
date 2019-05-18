import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  token_type: '';

  public domain = environment.apiURL;

  constructor(private http: Http, private router: Router) { }

  authenticateUser(email, password) {
    const headers = new Headers({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '
    });

    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post(this.domain + 'connect/token', body.toString(), { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    headers.append('Authorization', `${this.token_type} ${this.authToken}`);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.domain + 'api/profile/GetUser', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(data) {
    sessionStorage.setItem('token', data.access_token);
    this.token_type = data.token_type;
    this.authToken = data.access_token;
  }

  loadToken() {
    return sessionStorage.getItem('token');
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
