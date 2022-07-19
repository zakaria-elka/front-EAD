import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { JsonApiService } from "../core/api/json-api.service";
import { MissionsService } from "../+missions/missions.service";


@Component({
  selector: 'app-reporting',
  template: '<router-outlet></router-outlet>',
})
export class ReportingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

