import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AuthService } from '../+auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor } from './httpInterceptor.service';
@Injectable()
export class HttpService {

  constructor(private http: HttpInterceptor, private authService: AuthService, private toastr: ToastrService, private router: Router) {

  }

  post(url: string, body: any): Observable<any> {

    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map((response: Response) => {
        if (response.ok) {
          return Observable.of(response.json());
        }
      });
     
  }


  get(url: string): Observable<any> {

    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map((response: Response) => {
        if (response.ok) {
          return Observable.of(response.json());
        }
      });
      
  }
  
  getBlob(url: string): Observable<any> {

    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
    .map((response: Response) => {
        if (response.ok) {
          return Observable.of(response.blob);
        }
      });
      
  }
}
