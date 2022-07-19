import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignRoutingModule } from './assign-routing.module';
import { AssignComponent } from './assign.component';
import { SmartadminModule } from "../../shared/smartadmin.module";

@NgModule({
  imports: [
    CommonModule,
    AssignRoutingModule,
    SmartadminModule
  ],
  declarations: [AssignComponent]
})
export class AssignModule { }

