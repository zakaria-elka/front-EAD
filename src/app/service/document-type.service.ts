import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';

@Injectable()
export class DocumentTypeService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  getDocumentTypes(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/documenttypes/GetDocumentTypes').map(res => {
      return Observable.of(res.value);
    });
  }

  updateDocumentType(model): Observable<any> {
    
    return this.http.post(Constants.BASE_URL + '/api/documenttype/UpdateDocumentType', model).map(res => {
      return Observable.of(res.value);
    });
  } 

  addDocumentType(model): Observable<any> {

    return this.http.post(Constants.BASE_URL + '/api/documenttypes/AddDocumentType', model).map(res => {
      return Observable.of(res.value);
    });
  }

  deleteDocumentType(documentTypeId): Observable<any> {
   
    return this.http.post(Constants.BASE_URL + '/api/documenttype/DeleteDocumentType/' + documentTypeId, {}).map(res => {
      return Observable.of(res.value);
    });
  }

}