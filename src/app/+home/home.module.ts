import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import {SmartadminModule} from "../shared/smartadmin.module";
import { HomeComponent } from "./home.component";
import { SmartadminDatatableModule } from "../shared/ui/datatable/smartadmin-datatable.module";


import { MorrisGraphModule } from "../shared/graphs/morris-graph/morris-graph.module";

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SmartadminModule,
    SmartadminDatatableModule,
    MorrisGraphModule
  ],
})
export class HomeModule { }
