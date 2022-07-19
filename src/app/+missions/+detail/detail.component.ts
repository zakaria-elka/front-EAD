import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GoogleAPIService } from "../../service/google-api.service";
import { MissionsService } from "../missions.service";
import { Constants } from '../../app.constants';
import 'rxjs/add/observable/interval';
import { ModalDirective } from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from "../../shared/utils/notification.service";


import { UsersService } from '../../service/users.service';
import { AuthService } from '../../+auth/auth.service';
import { MessagingService } from '../../service/messaging.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit {

  @ViewChild('myModal') myModal;
  @ViewChild('sendMessageModal') sendMessageModal: ModalDirective;

  public map: any;
  public marker: any;

  private myLatLong = { lat: 33.589886, lng: -7.603869 }

  private moveBus: any;

  private fetchPosition: any;

  private iconSet: any;

  public missionDocuments:any;

  private missionId: any;

  private mission: any;

  private imageBasePath: any;

  private selectedImage: any;

  private showTracking: boolean;

  private audio: any;

  private routeShown: boolean;

  private fileUrl: any;
  private currentDocName : any;
  private docData : any;
  private patternPhoneNumber = new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');


  private newMessageModel = {
    phone: '',
    message: ''
  }

  constructor(private router: Router, private apiService: GoogleAPIService, private missionsService: MissionsService,
    private route: ActivatedRoute, private userService: UsersService, private authService: AuthService,
    private messagingService: MessagingService, private toastr: ToastrService, private notificationService: NotificationService,private sanitizer: DomSanitizer) {
     }

  ngOnInit() {
    this.routeShown = false;
    this.imageBasePath = Constants.BASE_URL;

    this.showTracking = this.authService.isUserAdministrator()
      || this.authService.isUserChargeAssistance()
      || this.authService.isUserManager()
      || this.authService.isUserPrestataire();



    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.missionId = params['id']
    });



    this.missionsService.getMissionsDocuments(this.missionId).subscribe(res => {
      this.missionDocuments = res.value;


    });

    this.missionsService.getMissionsById(this.missionId).subscribe(res => {
      this.mission = res.value;

      if (this.mission.MissionStatusId >= 4) {
        this.showTracking = false;
      }
      if (this.showTracking) {
        this.apiService.loadAPI.then((google: any) => {

          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;

          this.map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: this.myLatLong,
            zoom: 15
          });

          directionsDisplay.setMap(this.map);




          this.iconSet = {
            connected: {
              url: '../../../assets/img/pins/map-marker-icon-green.png',
              scaledSize: new google.maps.Size(32, 32)
            },
            disconnected: {
              url: '../../../assets/img/pins/map-marker-icon-red.png',
              scaledSize: new google.maps.Size(32, 32)
            },
          }

          this.marker = new google.maps.Marker({
            position: this.myLatLong,
            map: this.map,
            icon: this.iconSet.disconnected
          });



          this.moveBus = function () {
            this.marker.setPosition(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
            this.marker.setIcon(this.iconSet.connected);
            this.map.panTo(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));




          }

          this.fetchPosition = function () {
            if (this.mission && this.mission.UserId) {
              this.userService.getUsersLastPosition(this.mission.UserId).subscribe(res => {
                if (res && res.value) {
                  this.myLatLong.lat = res.value.Latitude;
                  this.myLatLong.lng = res.value.Longitude;

                  if (this.routeShown === false) {
                    if (this.routeShown !== undefined) {
                      this.routeShown = true;
                    }
                    directionsService.route({
                      origin: { lat: this.myLatLong.lat, lng: this.myLatLong.lng },
                      destination: { lat: this.mission.Latitude, lng: this.mission.Longitude },
                      travelMode: 'DRIVING'
                    }, function (response, status) {
                      if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        console.log("drawing location " + this.routeShown);

                      } else {
                        console.log('Directions request failed due to ' + status);
                        this.toastr.error("Impossible d'afficher la route du prestataire", "Erreur");

                      }
                    });
                  }

                }
              });
            }
          }

          setInterval(() => { this.moveBus(); }, 5000);
          setInterval(() => { this.fetchPosition(); }, 5000);


        })
      }


    });
  }

  playAudio(event, documentId) {


    event.preventDefault();
  
    this.audio = new Audio();
    this.audio.src = this.imageBasePath + "/api/Mission/GetDocumentVoiceData/?documentId=" + documentId;
    this.audio.load();

    var playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        this.audio.addEventListener('timeupdate', function () {
          console.log(this.audio.currentTime, this.audio.duration);
        }, true);
      }).catch(function (error) {
        console.error('Failed to start your sound, retrying.');
      });
    }

  }

  openModel(imagePath) {
    this.selectedImage = imagePath;
    
    (jQuery(this.myModal.nativeElement) as any).modal('show');
  }
  closeModel() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  showSendNotifPopup(param) {
    param.preventDefault();

    this.newMessageModel.phone = this.mission.Phone1;
    this.newMessageModel.message = '';
    this.sendMessageModal.show();
  }


  sendNotificationToClient(param) {
    param.preventDefault();
    this.messagingService.sendSMSToUser(this.newMessageModel.phone, this.newMessageModel.message).subscribe(res => {
      if (res.value === true) {
        this.toastr.success("Votre message a été envoyé", "Succés");
        this.sendMessageModal.hide();
        this.newMessageModel.phone = '';
        this.newMessageModel.message = '';
      }
      else {
        this.toastr.error("Impossible d'envoyer votre message", "Erreur");
      }
    });

  }

  cancelMission(param) {
    param.preventDefault();
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Êtes-vous sûr de vouloir annuler cette mission?",
      buttons: '[Non][Oui]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Oui") {
        var cancelMissionModel = {
          MissionId: this.mission.MissionId,
          MissionCancellationReasonId: 1,
          CancellationComment: 'Annulée par le chargé',
        }
        this.missionsService.cancelMission(cancelMissionModel).subscribe(data => {
          this.toastr.success("La mission est annulée", "Succés");
          this.router.navigate([this.authService.userHomePage]);

        });
      }
    });
  }

  sendPositionUpdateLink(param) {
    param.preventDefault();
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Veuillez confirmer le numéro de téléphone du client?",
      buttons: '[Non][Envoyer le lien]',
      input: "text",
      inputValue: this.mission.Phone1
    
    }, (ButtonPressed, data) => {
      if (ButtonPressed == "Envoyer le lien") {
        this.missionsService.sendMissionGetLocationText(this.mission.MissionId, data).subscribe(data => {
          this.toastr.success("Le lien de mise à jour de la position est envoyé", "Succés");

        });
      }
    });

  }

  sendTrackingLink(param) {
    param.preventDefault();
    // Test pattern  
    var phoneNumber = this.mission.Phone1;
    //console.log("Test Pattern ---> " + patt.test(phoneNumber));
    // end test pattern
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Veuillez confirmer le numéro de téléphone du client?",
      buttons: '[Non][Envoyer le lien]',
      input: "text",
      inputValue: this.mission.Phone1
    }, (ButtonPressed, data) => {
      if (ButtonPressed == "Envoyer le lien") {
        console.log("This.mission.Phone1 --> " + this.mission.Phone1);
          this.missionsService.sendMissionTrackingLink(this.mission.MissionId, data).subscribe(data => {
            this.toastr.success("Le lien de suivi de la mission est envoyé", "Succés");
        });
      }
    });
   
  }
  public modalHidden(param) {
    this.newMessageModel = {
      phone: '',
      message: ''
    }
  }

  //register(event) {
  //  event.preventDefault();
  //  this.router.navigate(['/dashboard'])
  //}

  deleteDocument(document){
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Êtes-vous sûr de vouloir supprimer ce document?",
      buttons: '[Non][Supprimer]'
    },
    (ButtonPressed) =>{
      if(ButtonPressed == "Supprimer"){
        this.missionsService.deleteDocument(document.MissionDocumentId).subscribe(data =>{
          if(data.value == true){
            this.toastr.success("Le document a été supprimé","Succés");
            this.missionDocuments.splice(this.missionDocuments.indexOf(document),1);
          }
        });
      }
    });
  }


  downloadDocuments(){
    var securedImageElement = document.getElementsByClassName("docDisplayed");
    for(let i = 0; i < this.missionDocuments.length;i++){
      var doc = this.missionDocuments[i];
      var a = document.createElement('a');
      var selectedElement = securedImageElement[i].children[0] as HTMLAnchorElement;
      this.docData = this.missionsService.downloadDocument(doc.MissionDocumentId);
      if(doc.HasAudio){
        this.currentDocName = doc.DocumentIdentifier + '.MP4';
      }else{
        this.currentDocName = doc.DocumentIdentifier + '.PNG';
      }
      this.fileUrl = selectedElement.href;
      a.href = this.fileUrl;
      a.download = this.currentDocName;
      a.click();
    }

  }
}
