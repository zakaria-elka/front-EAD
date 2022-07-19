import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireComponent } from './prestataire.component';
import { AgGridModule } from 'ag-grid-angular';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";


@NgModule({
  imports: [
    CommonModule,
    PrestataireRoutingModule,
     SmartadminModule,
    SmartadminInputModule,
    AgGridModule.withComponents([])
  ],
  declarations: [PrestataireComponent]
})
export class PrestataireModule { }


