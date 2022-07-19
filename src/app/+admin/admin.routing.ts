import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../+auth/auth.guard";

export const routes: Routes = [
  {
    path: 'documents',
    loadChildren: './+documents/documents.module#DocumentsModule',
    canActivate: [AuthGuard] 
  },
  {
    path: 'parametrage',
    loadChildren: './+parametrage/parametrage.module#ParametrageModule',
    canActivate: [AuthGuard] 
  },
  {
    path: 'prestataire',
    loadChildren: './+prestataire/prestataire.module#PrestataireModule',
    canActivate: [AuthGuard] 
  },
  {
    path: 'missiontype',
    loadChildren: './+missiontype/missiontype.module#MissionTypeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'utilisateurs',
    loadChildren: './+utilisateurs/utilisateurs.module#UtilisateursModule',
    canActivate: [AuthGuard] 
  },
  {
    path: 'steassurance',
    loadChildren: './+steassurance/steassurance.module#SteAssuranceModule',
    canActivate: [AuthGuard] 
  }
];

export const routing = RouterModule.forChild(routes);


