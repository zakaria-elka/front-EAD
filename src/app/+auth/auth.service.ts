import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, QueryEncoder} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Constants } from '../app.constants';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  public token: string;
  public userId: string;
  public roleId: string;
  public roleName: string;
  public userHomePage: string;
  public contractorId: string;
  public name: string;
  constructor(private http: Http) {

    var currentUser = JSON.parse(localStorage.getItem(Constants.USER_LOCALSTORE_KEY));
    this.token = currentUser && currentUser.token;
    this.userId = currentUser && currentUser.id;
    this.roleId = currentUser && currentUser.roleId;
    this.roleName = currentUser && currentUser.roleName;
    this.contractorId = currentUser && currentUser.contractorId;
    this.name=currentUser && currentUser.name;
    if (this.token !== null && this.token !== undefined && this.token !== '') {
      this.isLoggedIn = true;
      this.setUserHomePage();
    }
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {

    let body = new URLSearchParams('', new GhQueryEncoder());
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
    
    return this.http.post( Constants.BASE_URL+"/token", body).map((response: Response) => {
      
      if (response.ok) {
        
        let access_token = response.json() && response.json().access_token;
        if (access_token) {
          this.token = access_token;
          let respBody = response.json();
          let fullname = respBody.Name;
          this.userId = respBody.UserId;
          this.roleId = respBody.RoleId;
          this.roleName = respBody.RoleName;
          this.contractorId = respBody.ContractorId;

          if (this.roleId === "5") {
            return false;
          }
          localStorage.setItem(Constants.USER_LOCALSTORE_KEY, JSON.stringify({ name: fullname, token: access_token, id: this.userId, roleId: this.roleId, roleName: this.roleName, contractorId : this.contractorId }));
          this.isLoggedIn = true;
          this.setUserHomePage();
          return true;
        }
        else {
          this.isLoggedIn = false;
          return false;
        }
       
      }
    }).catch(error =>
        Observable.throw(error)
      
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token = null;
    this.userId = null;
    this.roleId = null;
    this.roleName = null

    localStorage.setItem(Constants.USER_LOCALSTORE_KEY, null);
    localStorage.setItem('dashboardSearchResultsOn', null);
    localStorage.setItem('dashboardSearchResults', null);

  }

  isUserAdministrator(): boolean {
    return this.roleId === "1";
  }

  isUserManager(): boolean {
    return this.roleId === "2";
  }

  isUserChargeAssistance(): boolean {
    return this.roleId === "3";
  }

  isUserPrestataire(): boolean {
    return this.roleId === "4";
  }

  isUserAgentAssurance(): boolean {
    return this.roleId === "6"
  }

  private setUserHomePage() {
    if (this.isUserAdministrator() || this.isUserChargeAssistance()) {
      this.userHomePage = '/home/assistance';
    }
    else if (this.isUserAgentAssurance()) {
      this.userHomePage = '/home/asscompagnie';
    }
    else if (this.isUserPrestataire()) {
      this.userHomePage = '/home/prestataire';
    }
    else if (this.isUserManager()) {
      this.userHomePage = '/home/manager';
    }
  }
}

class GhQueryEncoder extends QueryEncoder {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = super.encodeKey(v);
    return v.replace(/\+/gi, '%2B');
  }
}

