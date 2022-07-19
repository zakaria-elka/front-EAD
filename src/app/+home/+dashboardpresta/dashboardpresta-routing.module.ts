import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPrestaComponent } from "./dashboardpresta.component";

const routes: Routes = [{
  path: '',
  component: DashboardPrestaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardPrestaRoutingModule { }

