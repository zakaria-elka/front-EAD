import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MissionsService } from "../missions.service";
import {ContractorService } from "../../service/contractor.service"
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../+auth/auth.service';

@Component({
  selector: 'app-archives',
  templateUrl: './assign.component.html',
  styles: []
})
export class AssignComponent implements OnInit {

  private missionId: any;

  private mission: any;
  private users: any;
  private selectedUser;
  //private localisation: any;

  constructor(private router: Router, private missionsService: MissionsService,
    private route: ActivatedRoute, private contractorService: ContractorService, private toaster: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.missionId = params['id']
    });


    this.missionsService.getMissionsById(this.missionId).subscribe(res => {
      this.mission = res.value;
      this.contractorService.getUsersByContract(this.mission.ContractorId).subscribe(res => {
        this.users = res.value;
      })
    });
  }

  public affectMission() {
    this.missionsService.affecterMission(this.mission.MissionId, this.selectedUser).subscribe(res => {
      if (res.value) {
        this.toaster.success("Succés", "Votre mission a été afféctée avec succés");
        this.router.navigate([this.authService.userHomePage]);
      }
    });
  }
  
}

