import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../+auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService,
    private toaster: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    
    if (!this.authService.isLoggedIn) {
      // not logged in so return false
      this.router.navigate(['/auth/login']);
      return false;
    }

    switch (state.url) {
      case '/admin/documents':
      case '/admin/parametrage':
      case '/admin/prestataire':
      case '/admin/missiontype':
     
      case '/admin/steassurance':
        if (!this.authService.isUserAdministrator()) {
          this.onUnauthorizedAccess();
          return false;
        } else {
          return true;
        }
      case '/admin/utilisateurs':
        if (this.authService.isUserAdministrator() || this.authService.isUserPrestataire()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      case '/home/manager':
        if (this.authService.isUserAdministrator() || this.authService.isUserManager()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      case '/home/assistance':
        if (this.authService.isUserAdministrator() || this.authService.isUserChargeAssistance()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      case '/home/asscompagnie':
        if (this.authService.isUserAdministrator() || this.authService.isUserAgentAssurance()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      case '/home/prestataire':
        if (this.authService.isUserAdministrator() || this.authService.isUserPrestataire()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      case '/missions/archives':
      case '/missions/encours':
      //case '/missions/detail/:id':
        return true;
      case '/missions/cancelled':
      case '/missions/nouvelle':
        if (this.authService.isUserAdministrator() || this.authService.isUserChargeAssistance() || this.authService.isUserPrestataire()) {
          return true;
        } else {
          this.onUnauthorizedAccess();
          return false;
        }
      //case '/missions/assign/:id':
      //  if (this.authService.isUserAdministrator() || this.authService.isUserPrestataire()) {
      //    return true;
      //  } else {
      //    this.toaster.error("Vous n'êtes pas autorisé à accéder à cette ressource", "Accès non autorisé");
      //    return false;
      //  }
    }

    if (state.url.startsWith('/missions/detail')) {
      return true;
    }

    if (state.url.startsWith('/missions/assign')) {
      if (this.authService.isUserAdministrator() || this.authService.isUserPrestataire()) {
        return true;
      } else {
        this.onUnauthorizedAccess();
        return false;
      }
    }

   

    // not logged in so redirect to login page
    
    return false;
  }

  onUnauthorizedAccess() {
    this.toaster.error("Vous n'êtes pas autorisé à accéder à cette ressource", "Accès non autorisé");
    localStorage.setItem(Constants.USER_LOCALSTORE_KEY, null);
    localStorage.setItem('dashboardSearchResultsOn', null);
    localStorage.setItem('dashboardSearchResults', null);
    this.router.navigate(['/auth/login']);
  }
}

