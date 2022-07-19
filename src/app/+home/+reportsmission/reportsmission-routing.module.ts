import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsMissionComponent } from "./reportsmission.component";

const routes: Routes = [{
  path: '',
  component: ReportsMissionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReportsMissionRoutingModule { }

