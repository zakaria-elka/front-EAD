import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from '../service/http.service';
import { AuthService } from '../+auth/auth.service';
import { Constants } from '../app.constants';
import { concatStatic } from 'rxjs/operator/concat';

@Injectable()
export class MissionsService {

  constructor(private http: HttpService, private authService: AuthService) {

  }

  getMissionsEnCours(): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionsEnCours/?userId=' + this.authService.userId).map(res => {

      return Observable.of(res.value);
    });
  }

  // Modification YAHYA-B 06/04/2022
  getMissions(): Observable<any>{
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissions').map(res=>{
      return Observable.of(res.value);
    });
  }
  // Fin modification YAHYA-B

  getMissionsEchusNonSync(): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionsEchusNonSync/?userId=' + this.authService.userId).map(res => {

      return Observable.of(res.value);
    });
  }


  getMissionsArchives(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionsArchives/?userId=' + this.authService.userId).map(res => {
      return Observable.of(res.value);
    });
  }

  getMissionsNonAffectees(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionsNonAffectees/?userId=' + this.authService.userId).map(res => {
      return Observable.of(res.value);
    });
  }


  getMissionsAnnulees(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionsAnnulees/?userId=' + this.authService.userId).map(res => {
      return Observable.of(res.value);
    });
  }

  getMissionsById(missionId): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionById/?missionId=' + missionId).map(res => {
      return Observable.of(res.value);
    });
  }

  getMissionsDocuments(missionId): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetMissionDocuments/?missionId=' + missionId).map(res => {
      return Observable.of(res.value);
    });
  }

  saveMission(mission): Observable<any> {

    return this.http.post(Constants.BASE_URL + '/api/mission/CreateNewMission', mission).map(res => {
      return Observable.of(res.value);
    });
  }

  affecterMission(missionId, userId): Observable<any> {
    var affectationObj = { MissionId: missionId, UserId: userId}
    return this.http.post(Constants.BASE_URL + '/api/mission/AffecterMission', affectationObj).map(res => {
      return Observable.of(res.value);
    });
  }

  searchMissions(searchStr, searchMode): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/mission/SearchMissions?searchStr=' + searchStr + '&searchMode=' + searchMode, {}).map(res => {
      return Observable.of(res.value);
    });
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/stats/GetDashboardStats/').map(res => {
      return Observable.of(res.value);
    });
  }

  cancelMission(model): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/mission/CancelMission', model).map(res => {
      return Observable.of(res.value);
    });
  }

  sendMissionGetLocationText(missionId, newPhoneNumber): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/mission/SendMissionGetLocationText?missionId=' + missionId + '&newPhoneNumber=' + newPhoneNumber, {}).map(res => {
      return Observable.of(res.value);
    });
  }

  sendMissionTrackingLink(missionId, newPhoneNumber): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/mission/SendMissionTrackingLink?missionId=' + missionId + '&newPhoneNumber=' + newPhoneNumber, {}).map(res => {
      return Observable.of(res.value);
    });
  }

  getDocumentData(documentId:string): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/GetDocumentData/?documentId=' + documentId).map(res => {
      return Observable.of(res.value);
    });
  }

  // Modification YAHYA
  downloadDocument(documentId:string): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/mission/DownloadDocument/?documentId=' + documentId).map(res=> {
      return res.value;
    });
  }
  // Fin modification YAHYA


  getDocumentVoiceData(documentId:string): Observable<any>{
    return this.http.get(Constants.BASE_URL + '/api/mission/GetDocumentVoiceData/?documentId=' +documentId).map(res =>{
      
      return Observable.of(res.value);
    });
  }

  deleteDocument(missionDocumentId): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/mission/DeleteMissionData/?missionDocumentId=' + missionDocumentId,{}).map(res => {
      return Observable.of(res.value);
    });
  }
  

}

