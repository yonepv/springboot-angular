import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService : BasicAuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //let username = 'in28minutes'
    // let password = 'dummy'
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    console.log('basicAuthHeaderString: ' + basicAuthHeaderString + ', username: ' + username);

    if(basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }

    return next.handle(req);
  }
}
