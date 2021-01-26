import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})

export class BasicAuthenticationService {

  constructor(private http: HttpClient) { } 

  executeJWTAuthenticationService(username: string, password: string) {

    return this.http.post<any>(
      `${API_URL}/authenticate`,{
        username,
        password
      }).pipe(
      map(
        data => { 
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  executeAuthenticationService(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(
      //`http://localhost:8080/basicauth`,
      `${API_URL}/basicauth`,
    {headers}).pipe(
      map(
        data => { 
          sessionStorage.setItem(/*'authenticaterUser'*/AUTHENTICATED_USER, username);
          sessionStorage.setItem(/*'token'*/TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
    //console.log("Execute Hello World Bean Service");
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'in28minutes'
    let password = 'dummy'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    return basicAuthHeaderString;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(/*'authenticaterUser'*/AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(/*'token'*/TOKEN)
    
    return '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(/*'authenticaterUser'*/AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(/*'authenticaterUser'*/AUTHENTICATED_USER);
    sessionStorage.removeItem(/*'token'*/TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message:string) {

  }
}
