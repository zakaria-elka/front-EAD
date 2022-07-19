import { NgModule } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
@NgModule({})
@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var currentUser = JSON.parse(localStorage.getItem(Constants.USER_LOCALSTORE_KEY));
    const token = currentUser && currentUser.token;
    const requestToHandle = token
      ? request.clone({
        headers: request.headers.set('authorization', `Bearer ${token}`)
      })
      : request;
    return next.handle(requestToHandle);
  }
}