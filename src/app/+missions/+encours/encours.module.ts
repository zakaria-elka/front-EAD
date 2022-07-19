import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncoursRoutingModule } from './encours-routing.module';
import { EncoursComponent } from './encours.component';
import { SmartadminModule } from "../../shared/smartadmin.module";

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    EncoursRoutingModule,
    SmartadminModule,
    NgxPaginationModule
  ],
  declarations: [EncoursComponent]
})
export class EncoursModule { }

