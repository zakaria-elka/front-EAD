import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingMissionComponent } from "./reportingmission.component";

const routes: Routes = [{
  path: '',
  component: ReportingMissionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReportingMissionRoutingModule { }

