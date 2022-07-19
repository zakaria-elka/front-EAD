import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from "./admin.routing";
import { AdminComponent } from './admin.component';


import { SmartadminModule } from "../shared/smartadmin.module";

@NgModule({
  imports: [
    CommonModule,

    routing,
    SmartadminModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }

