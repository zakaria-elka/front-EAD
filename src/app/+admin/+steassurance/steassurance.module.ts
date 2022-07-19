import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteAssuranceRoutingModule } from './steassurance-routing.module';
import { SteAssuranceComponent } from './steassurance.component';
import { AgGridModule } from 'ag-grid-angular';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";


@NgModule({
  imports: [
    CommonModule,
    SteAssuranceRoutingModule,
     SmartadminModule,
    SmartadminInputModule,
    AgGridModule.withComponents([])
  ],
  declarations: [SteAssuranceComponent]
})
export class SteAssuranceModule { }

