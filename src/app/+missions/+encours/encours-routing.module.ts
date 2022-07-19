import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncoursComponent } from "./encours.component";

const routes: Routes = [{
  path: '',
  component: EncoursComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EncoursRoutingModule { }


