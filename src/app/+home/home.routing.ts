import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { ModuleWithProviders } from "@angular/core";

export const homeRoutes: Routes = [
  //{
  //  path: 'manager',
  //  component: HomeComponent,
  //  data: {
  //    pageTitle: 'Home'
  //  }
  //},
  {
    path: 'manager',
    loadChildren: './+dashboardmanager/dashboardmanager.module#DashboardManagerModule'
  },
  {
    path: 'assistance',
    loadChildren : './+dashboardassist/dashboardassist.module#DashboardAssistModule'
  },
  {
    path: 'asscompagnie',
    loadChildren: './+dashboardassur/dashboardassur.module#DashboardAssurModule'
  },
  {
    path: 'prestataire',
    loadChildren: './+dashboardpresta/dashboardpresta.module#DashboardPrestaModule'
  },
  {
    path: 'reportsmission',
    loadChildren: './+reportsmission/reportsmission.module#ReportsMissionModule'
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

