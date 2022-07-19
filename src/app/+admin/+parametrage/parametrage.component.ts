import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ConfigService } from "../../service/config.service";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from "../../shared/utils/notification.service";

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styles: []
})
export class ParametrageComponent implements OnInit {

  private recordModel;

  @ViewChild('missionTotalDuration') _missionTotalDuration: ElementRef;
  @ViewChild('MissionAssignmentSLA') _missionAssignmentSLA: ElementRef;
  @ViewChild('MissionCheckinSLA') _missionCheckinSLA: ElementRef;
  @ViewChild('MissionCloseSLA') _missionCloseSLA: ElementRef;
  @ViewChild('MissionSyncSLA') _missionSyncSLA: ElementRef;

  constructor(private router: Router, private configService: ConfigService,
    private notificationService: NotificationService, private toaster: ToastrService) { }

  
  ngOnInit() {

    //this.recordModel = {
    //  MissionTotalDuration: 0,
    //  MissionAssignmentSLA: 0,
    //  MissionCheckinSLA: 0,
    //  MissionCloseSLA: 0,
    //  MissionSyncSLA: 0
    //}

    this.configService.getConfig().subscribe(data => {
      
      this.recordModel = data.value;
    });
   
  }

  paramsSaveClick(params) {

    this.recordModel.MissionTotalDuration = this._missionTotalDuration.nativeElement.value;
    this.recordModel.MissionAssignmentSLA = this._missionAssignmentSLA.nativeElement.value;
    this.recordModel.MissionCheckinSLA = this._missionCheckinSLA.nativeElement.value;
    this.recordModel.MissionCloseSLA = this._missionCloseSLA.nativeElement.value;
    this.recordModel.MissionSyncSLA = this._missionSyncSLA.nativeElement.value;

    this.configService.updateConfig(this.recordModel).subscribe(data => {

      this.toaster.success("La configuration a été mis à jour avec succés", "Succés");
      

     
    });
  }

}

