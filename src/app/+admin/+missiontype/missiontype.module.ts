import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionTypeRoutingModule } from './missiontype-routing.module';
import { MissionTypeComponent } from './missiontype.component';
import { AgGridModule } from 'ag-grid-angular';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MissionTypeRoutingModule,
    SmartadminModule,
    SmartadminInputModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MissionTypeComponent]
})
export class MissionTypeModule { }

