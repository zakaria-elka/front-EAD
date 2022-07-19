import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

export const reportingRoutes: Routes = [
 
  {
    path: 'reportingmission',
    loadChildren: './+reportingmission/reportingmission.module#ReportingMissionModule'
  }
];

export const reportingRouting: ModuleWithProviders = RouterModule.forChild(reportingRoutes);

 