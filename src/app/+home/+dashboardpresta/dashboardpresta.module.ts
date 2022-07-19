import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPrestaRoutingModule } from './dashboardpresta-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { DashboardPrestaComponent } from "./dashboardpresta.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';


import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardPrestaRoutingModule,
    SmartadminModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [DashboardPrestaComponent]
})
export class DashboardPrestaModule { }

