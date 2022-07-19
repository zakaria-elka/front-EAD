import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';
import { map } from 'jquery';

@Injectable()
export class UsersService {

  constructor(private http: HttpService, private authService: AuthService) {

  }



  getUsersLastPosition(userId): Observable<any> {

    return this.http.get(Constants.BASE_URL + '/api/geodata/GetUserLastPosition/?userId=' + userId).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  getAllUsersByRole(userId): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/user/GetAllUsersByRole/?userId=' + userId).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  activateUser(userId): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/ActivateUser/?userId=' + userId, {}).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  desactivateUser(userId): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/DesactivateUser/?userId=' + userId, {  }).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  deleteUser(userId): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/DeleteUser/?userId=' + userId, {  }).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  getRoles(): Observable<any> {
    return this.http.get(Constants.BASE_URL + '/api/user/GetRoles/').map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  createNewUser(userModel): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/CreateNewUser/', userModel).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  updateUser(userModel): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/UpdateUser/', userModel).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  resetPassword(userId): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/ResetPassword/?userId=' + userId, {}).map(res => {
      console.log(res.value);
      return Observable.of(res.value);
    });
  }

  // modification YAHYA-B 29/03/2022
  
  changePassword(changePasswordModel): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/ChangePassword/', changePasswordModel).map(res =>{
      console.log(res.value);
      return Observable.of(res.value);
    })
     
  }
  // Fin modification YAHYA-B

  checkUsername(username): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/user/CheckUsername/?username=' + username, {}).map(res => {
      console.log(res.value);
      if (res.value === 'OK') {
        return Observable.of(true);
      }
      else {
        return Observable.of(false);
      }
    });
  }
  
}


