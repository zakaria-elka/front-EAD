import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MissionTypeComponent } from "./missiontype.component";

const routes: Routes = [{
  path: '',
  component: MissionTypeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MissionTypeRoutingModule { }


