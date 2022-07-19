import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';


@Injectable()
export class ConfigService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  getConfig(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/config/GetConfig/').map(res => {
      return Observable.of(res.value);
    });
  }


  updateConfig(model): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/config/UpdateConfig/', model).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }
  
}


