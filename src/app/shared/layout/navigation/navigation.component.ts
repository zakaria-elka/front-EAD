import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import {AuthService} from "../../../+auth/auth.service"

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

}


