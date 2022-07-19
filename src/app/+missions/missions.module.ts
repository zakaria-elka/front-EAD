import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from "./missions.routing";
import { MissionsComponent } from './missions.component';


import { SmartadminModule } from "../shared/smartadmin.module";

@NgModule({
  imports: [
    CommonModule,

    routing,
    SmartadminModule
  ],
  declarations: [MissionsComponent]
})
export class MissionsModule { }

