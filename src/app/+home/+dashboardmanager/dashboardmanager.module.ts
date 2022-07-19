import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardManagerRoutingModule } from './dashboardmanager-routing.module';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { DashboardManagerComponent } from "./dashboardmanager.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';

import { MorrisGraphModule } from "../../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardManagerRoutingModule,
    SmartadminModule,
    MorrisGraphModule,
    NgxPaginationModule,
    AgGridModule.withComponents([])
  ],
  declarations: [DashboardManagerComponent]
})
export class DashboardManagerModule { }

