import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelledComponent } from "./cancelled.component";

const routes: Routes = [{
  path: '',
  component: CancelledComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CancelledRoutingModule { }

