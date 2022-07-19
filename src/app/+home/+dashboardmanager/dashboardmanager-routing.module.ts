import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardManagerComponent } from "./dashboardmanager.component";

const routes: Routes = [{
  path: '',
  component: DashboardManagerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardManagerRoutingModule { }

