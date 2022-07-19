import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';


@Injectable()
export class ContractorService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  searchContractor(searchStr): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/contractor/GetContractorsSearch/?searchStr=' + searchStr).map(res => {

      return Observable.of(res.value);
    });
  }

  getUsersByContract(contractorId): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/contractor/GetUsersByContractor/?contractorId=' + contractorId).map(res => {

      return Observable.of(res.value);
    });
  }

  getContractors(): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/contractor/GetContractors/').map(res => {

      return Observable.of(res.value);
    });
  }

  createNewContractor(contractorModel): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/contractor/CreateContractor/', contractorModel).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  deleteContractor(id): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/contractor/DeleteContractor/'+id, {}).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }
  
  updateContractor(contractorModel): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/contractor/UpdateContractor/', contractorModel).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }
}

