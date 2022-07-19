import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reportingRouting } from './reporting.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import { ReportingComponent } from "./reporting.component";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";


import { MorrisGraphModule } from "../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    reportingRouting,
    SmartadminModule,
    SmartadminDatatableModule,
    MorrisGraphModule
  ],
})
export class ReportingModule { }

