import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { AgGridModule } from 'ag-grid-angular';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";


@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminInputModule,
    UtilisateursRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [UtilisateursComponent]
})
export class UtilisateursModule { }


