import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAssurComponent } from "./dashboardassur.component";

const routes: Routes = [{
  path: '',
  component: DashboardAssurComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardAssurRoutingModule { }

