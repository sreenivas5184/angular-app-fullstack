import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseBean } from '../models/ResponseBean';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-spacing
import {Headers, RequestOptions} from  '@angular/http';
@Injectable()
export class LoginService {
  homeButtonDisabled: boolean;
  loginEmail: string;
constructor(private http: HttpClient) {

}
  getLoginData(): any {
    const loginMail = localStorage.getItem('loginEmail');
    const url = 'api/profile?email=' + loginMail;
    this.http.get(url, { responseType: 'json'}).subscribe(
      response => {
        console.log(response);
      return response;
      },
      error => {

      }
    );
  }
  public updateProfile(updateProfileData) {
    const url = 'api/updateProfile';
    return this.http.put(url, updateProfileData).map((response: ResponseBean) => response);
  }

 public login(loginCredentials) {
  const url = 'api/login';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  return this.http.post(url, loginCredentials, httpOptions).map((response: ResponseBean) => response);
 }

 public getProfile() {
  const loginMail = localStorage.getItem('loginEmail');
  const url = 'api/profile?email=' + loginMail;
  return this.http.get(url).map((response: ResponseBean) => response);
 }

}

