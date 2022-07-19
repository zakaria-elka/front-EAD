import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NouvelleRoutingModule } from './nouvelle-routing.module';
import { NouvelleComponent } from './nouvelle.component';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
      CommonModule,
    SmartadminModule,
    NouvelleRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [NouvelleComponent]
})
export class NouvelleModule { }


