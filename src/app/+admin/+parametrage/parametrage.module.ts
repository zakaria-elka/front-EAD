import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ParametrageComponent } from './parametrage.component';
import { SmartadminModule } from "../../shared/smartadmin.module";
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";

@NgModule({
  imports: [
    CommonModule,
    ParametrageRoutingModule,
    SmartadminModule,
    SmartadminInputModule,
  ],
  declarations: [ParametrageComponent]
})
export class ParametrageModule { }
