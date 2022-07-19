import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAssistComponent } from "./dashboardassist.component";

const routes: Routes = [{
  path: '',
  component: DashboardAssistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardAssistRoutingModule { }

