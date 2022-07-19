import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router";


export const routes: Routes = [
  {
    path: 'archives',
    loadChildren: './+archives/archives.module#ArchivesModule'
  },
  {
    path: 'encours',
    loadChildren: './+encours/encours.module#EncoursModule'
  },
  {
    path: 'cancelled',
    loadChildren: './+cancelled/cancelled.module#CancelledModule'
  },
  {
    path: 'detail/:id',
    loadChildren: './+detail/detail.module#DetailModule',
  },
  {
    path: 'nouvelle',
    loadChildren: './+nouvelle/nouvelle.module#NouvelleModule'
  }
  ,
  {
    path: 'assign/:id',
    loadChildren: './+assign/assign.module#AssignModule'
  }
];

export const routing = RouterModule.forChild(routes);

