import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsMissionRoutingModule } from './reportsmission-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { ReportsMissionComponent } from "./reportsmission.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    ReportsMissionRoutingModule,
    SmartadminModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ReportsMissionComponent]
})
export class ReportsMissionModule { }


