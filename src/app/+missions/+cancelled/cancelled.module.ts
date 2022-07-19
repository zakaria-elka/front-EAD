import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelledRoutingModule } from './cancelled-routing.module';
import { CancelledComponent } from './cancelled.component';

import { SmartadminModule } from "../../shared/smartadmin.module";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    CancelledRoutingModule,
    SmartadminModule,
    NgxPaginationModule
  ],
  declarations: [CancelledComponent]
})
export class CancelledModule { }


