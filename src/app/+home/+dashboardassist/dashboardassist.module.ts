import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAssistRoutingModule } from './dashboardassist-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { DashboardAssistComponent } from "./dashboardassist.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardAssistRoutingModule,
    SmartadminModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [DashboardAssistComponent]
})
export class DashboardAssistModule { }


