import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from '../../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { JsonApiService } from "../../core/api/json-api.service";
import { MissionsService } from "../../+missions/missions.service";

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styles: []
})
export class ArchivesComponent implements OnInit {

  public missionsArchives: any;
  private missionEnCoursPageNumber = 1;

  constructor(private router: Router, private http: HttpService, private toastr: ToastrService,
    private jsonApiService: JsonApiService, private missionsService: MissionsService) { }

  ngOnInit() {

    this.missionsService.getMissionsArchives().subscribe(res => {

      this.missionsArchives = res.value;
    });
  }


  public pageChangedMissionsEnCours(param) {
    this.missionEnCoursPageNumber = param;
  }


  public showDetailMission(missionId) {
    this.router.navigate(['/missions/detail/' + missionId]);
  }

}

