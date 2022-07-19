import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { Router } from '@angular/router';
// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

import { ToastrService } from 'ngx-toastr';
import { Constants } from '../app.constants';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: XHRBackend,
    options: RequestOptions,
    public http: Http,
    private toastr: ToastrService
    , private router: Router)
  {
    super(backend, options);
    this.toastr.toastrConfig.preventDuplicates = true;
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.handleError)
  }

  public handleError = (error: Response) => {

    if (error.status == 401 || error.status == 403) {
      this.handleUnauthorized();
    }
    else {
      this.toastr.error("Erreur de chargement des données", "Erreur", { timeOut: 0, positionClass: 'toast-top-full-width'})
    }
    // Do messaging and error handling here
    return Observable.throw(error)
  }

  private handleUnauthorized() {
    //clear token from session
    localStorage.removeItem(Constants.USER_LOCALSTORE_KEY);

    //redirect to auth page
    this.router.navigate([Constants.AUTH_PATH]);
  }
}

