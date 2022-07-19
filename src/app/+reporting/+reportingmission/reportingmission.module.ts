import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingMissionRoutingModule } from './reportingmission-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ReportingMissionComponent } from "./reportingmission.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    ReportingMissionRoutingModule,
    SmartadminModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ReportingMissionComponent]
})
export class ReportingMissionModule { }


