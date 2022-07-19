import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";

declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Se déconnecter" data-action="userLogout"
                  data-logout-msg="Vous pouvez améliorer davantage votre sécurité après votre déconnexion en fermant cette fenêtre de navigation."><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService) { }

  showPopup(){
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Se déconnecter <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content: "Vous pouvez améliorer davantage votre sécurité après votre déconnexion en fermant cette fenêtre de navigation.",
      buttons : '[Non][Oui]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Oui") {
        this.logout()
      }
    });
  }

  logout(){
      this.router.navigate(['/auth/login'])
  }

  ngOnInit() {

  }



}

