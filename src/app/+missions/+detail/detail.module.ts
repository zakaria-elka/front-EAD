import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { SmartadminModule } from "../../shared/smartadmin.module";
import {SecuredImageComponent} from '../../shared/secured-image.component';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [  
    CommonModule,
    DetailRoutingModule,
    SmartadminModule
    
  ],
  declarations: [DetailComponent,SecuredImageComponent],
  
})
export class DetailModule { }

