import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAssurRoutingModule } from './dashboardassur-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { DashboardAssurComponent } from "./dashboardassur.component";
import { SmartadminDatatableModule } from "../../shared/ui/datatable/smartadmin-datatable.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardAssurRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [DashboardAssurComponent]
})
export class DashboardAssurModule { }


