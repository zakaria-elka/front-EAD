import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestataireComponent } from "./prestataire.component";

const routes: Routes = [{
  path: '',
  component: PrestataireComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PrestataireRoutingModule { }

