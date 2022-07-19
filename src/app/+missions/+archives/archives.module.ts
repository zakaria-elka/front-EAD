import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesComponent } from './archives.component';

import { SmartadminModule } from "../../shared/smartadmin.module";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    SmartadminModule,
    NgxPaginationModule
  ],
  declarations: [ArchivesComponent]
})
export class ArchivesModule { }


