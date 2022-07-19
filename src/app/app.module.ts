import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastrModule } from 'ngx-toastr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import { CoreModule } from "./core/core.module";
import { SmartadminLayoutModule } from "./shared/layout/layout.module";
import { AuthGuard } from "../app/+auth/auth.guard";
import { AuthService } from '../app/+auth/auth.service';
import { HttpService } from '../app/service/http.service';
import { HttpInterceptor } from '../app/service/httpInterceptor.service';
import { MissionsService } from "../app/+missions/missions.service";
import { GoogleAPIService } from "../app/service/google-api.service";
import { ContractorService } from "../app/service/contractor.service";
import { SouscripteurService } from "../app/service/souscripteur.service";
import { UsersService } from "../app/service/users.service";
import { DocumentTypeService } from "../app/service/document-type.service";
import { InsuranceCompanyService } from "../app/service/insurance-company.service";
import { MissionTypeService } from "../app/service/mission-type.service";
import { ConfigService } from "../app/service/config.service";
import { MessagingService } from "../app/service/messaging.service";
import {MyHttpInterceptor} from '../app/service/my-http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    SmartadminLayoutModule,
    ToastrModule.forRoot(), // ToastrModule added


    routing
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    AuthGuard,
    AuthService,
    HttpService,
    HttpInterceptor,
    MissionsService,
    GoogleAPIService,
    ContractorService,
    SouscripteurService,
    UsersService,
    DocumentTypeService,
    InsuranceCompanyService,
    MissionTypeService,
    ConfigService,
    MessagingService,
    
    {
      provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true
    }
    
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }


}