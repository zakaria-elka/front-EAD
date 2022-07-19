import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NouvelleComponent } from "./nouvelle.component";

const routes: Routes = [{
  path: '',
  component: NouvelleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NouvelleRoutingModule { }

