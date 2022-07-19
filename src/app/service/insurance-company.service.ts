import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';

@Injectable()
export class InsuranceCompanyService {

  constructor(private http: HttpService, private authService: AuthService) {

  }


  getAllCompanies(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/insurancecompany/GetAllCompanies').map(res => {
      return Observable.of(res.value);
    });
  }

  createNewInsuranceCompany(model): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/insurancecompany/CreateInsuranceCompany/', model).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  deleteInsuranceCompany(id): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/insurancecompany/DeleteInsuranceCompany/' + id, {}).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  updateInsuranceCompany(model): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/insurancecompany/UpdateInsuranceCompany/', model).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }
}

