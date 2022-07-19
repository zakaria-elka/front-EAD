import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteAssuranceComponent } from "./steassurance.component";

const routes: Routes = [{
  path: '',
  component: SteAssuranceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SteAssuranceRoutingModule { }

