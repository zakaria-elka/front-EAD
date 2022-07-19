import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login(event) {
    event.preventDefault();
    this.error = '';
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result == true) {
          this.router.navigate([this.authService.userHomePage]);
        }
        else {
          this.error = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
          this.loading = false;
        }
      },
      error => {
      this.error = 'Le nom d\'utilisateur ou le mot de passe est incorrect.';
        this.loading = false; }
      );
  }

}

