import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParametrageComponent } from "./parametrage.component";

const routes: Routes = [{
  path: '',
  component: ParametrageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ParametrageRoutingModule { }


