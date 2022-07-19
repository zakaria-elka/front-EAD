import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';


@Injectable()
export class SouscripteurService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  searchSouscripteur(searchStr): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/souscripteur/GetSouscripteurSearch/?searchStr=' + searchStr).map(res => {

      return Observable.of(res.value);
    });
  }


}


