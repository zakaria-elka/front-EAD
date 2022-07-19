import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpService } from './http.service';
import { AuthService } from '../+auth/auth.service';

import { Constants } from '../app.constants';

@Injectable()
export class MessagingService {

  constructor(private http: HttpService, private authService: AuthService) {

  }
  

  sendSMSToUser(phoneNumber, message): Observable<any> {
    return this.http.post(Constants.BASE_URL + '/api/messaging/SendSMSToUser?phoneNumber=' + phoneNumber +'&message='+message, {}).map(res => {
      return Observable.of(res.value);
    });
  }
  
}

