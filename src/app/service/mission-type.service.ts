import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';

@Injectable()
export class MissionTypeService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  getAllMissionType(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/missiontype/GetAllMissionTypes').map(res => {
      return Observable.of(res.value);
    });
  }

  addMissionType(model): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/missiontype/AddMissionType', model).map(res => {
      return Observable.of(res.value);
    });
  }

  updateMissionType(model): Observable<any> {

    return this.http.post(Constants.BASE_URL + '/api/missiontype/UpdateMissionType', model).map(res => {
      return Observable.of(res.value);
    });
  } 

  deleteMissionType(missionTypeId): Observable<any> {

    return this.http.post(Constants.BASE_URL + '/api/missiontype/DeleteMissionType/' + missionTypeId, {}).map(res => {
      return Observable.of(res.value);
    });
  }
}


