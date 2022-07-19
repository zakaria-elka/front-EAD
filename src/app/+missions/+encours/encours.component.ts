import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from '../../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { JsonApiService } from "../../core/api/json-api.service";
import { MissionsService } from "../../+missions/missions.service";

@Component({
  selector: 'app-encours',
  templateUrl: './encours.component.html',
  styles: []
})
export class EncoursComponent implements OnInit {

  public missionsEnCours: any;
  private missionEnCoursPageNumber = 1;

  constructor(private router: Router, private http: HttpService, private toastr: ToastrService,
    private jsonApiService: JsonApiService, private missionsService: MissionsService) { }

  ngOnInit() {

    this.missionsService.getMissionsEnCours().subscribe(res => {

      this.missionsEnCours = res.value;
    });

  }


  public showDetailMission(missionId) {
    this.router.navigate(['/missions/detail/' + missionId]);
  }

  public pageChangedMissionsEnCours(param) {
    this.missionEnCoursPageNumber = param;
  }

 
}

