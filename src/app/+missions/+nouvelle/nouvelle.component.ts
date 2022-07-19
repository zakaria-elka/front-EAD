import { Component, OnInit, ViewChild, ChangeDetectorRef, ApplicationRef, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GoogleAPIService } from "../../service/google-api.service";
import { MissionsService } from "../missions.service";
import { NotificationService } from "../../shared/utils/notification.service";
import { ModalDirective } from "ngx-bootstrap";
import { ContractorService } from '../../service/contractor.service';
import { SouscripteurService } from '../../service/souscripteur.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../+auth/auth.service';
//import $ = require('jQuery');
//import * as $ from "jquery";

@Component({
  selector: 'app-nouvelle',
  templateUrl: './nouvelle.component.html',
  styles: []
})
export class NouvelleComponent implements OnInit {

  public map: any;
  public marker: any;

  private defaultLatLong = { lat: 33.589886, lng: -7.603869 }
  private myLatLong = { lat: 33.589886, lng: -7.603869 }

  private moveBus: any;

  private iconSet: any;
  private geocoder: any;
  private address: any;

  private contractorsResult: any;
  private contractSearchStr: any;
  private souscripteurSearchStr: any;
  private souscripteurResult: any;

  private selectedPrestataire: any;
  private selectedSouscripteur: any;
  private selectedGeoPosition: any;

  private numeroDossierSinistre: any;
  private commentaireDossier: any;

  private numeroImmatriculation: any;
  private phone1: any;
  private phone: any;


  private SouscripteurGridcolumnDefs = [
    { headerName: 'Prénom', field: 'FirstName' },
    { headerName: 'Nom', field: 'LastName' },
    { headerName: 'Numéro de Police', field: 'PolicyNumber' },
    { headerName: 'Produit', field: 'ContractName' },
    {
      headerName: 'Date Effet', field: 'DateEffet', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          return '-';
        }
      }
    },
    {
      headerName: 'Date Echeance', field: 'DateEcheance', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString();
        } else {
          return '-';
        }
      }
    },
    { headerName: 'Numero d\'immatriculation', field: 'NumeroImmatriculation' }

  ];

  private SouscripteurGridrowData = [];

  private SouscripteurGridgridApi;
  private SouscripteurGridgridColumnApi;


  private PrestataireGridcolumnDefs = [
    { headerName: 'Nom Prestataire', field: 'ContractorName' },
    { headerName: 'Ville', field: 'City' },
    { headerName: 'Type d\'Activité', field: 'ActivityType' },
    { headerName: 'Téléphone', field: 'Phone' },
    { headerName: 'Email', field: 'Email' }

  ];

  private PrestataireGridrowData = [];

  private PrestataireGridgridApi;
  private PrestataireGridgridColumnApi;


  private rowSelection;
  private rowSelected;

  private localeText = {
    page: "Page",
    more: "Plus",
    to: "à",
    of: "de",
    next: "Prochaine",
    last: "Dernière",
    first: "Première",
    previous: "Précedente",
    loadingOoo: "Chargement en cours...",
    selectAll: "Tout Selectionner",
    searchOoo: "Rechercher...",
    blanks: "Vide",
    filterOoo: "Filtre...",
    applyFilter: "Appliquer le Filtre...",
    equals: "Egale",
    notEqual: "Non Egale",
    lessThanOrEqual: "Moins ou égale",
    greaterThanOrEqual: "Plus ou égale",
    inRange: "daInRange",
    lessThan: "daLessThan",
    greaterThan: "daGreaterThan",
    contains: "Contient",
    startsWith: "Commence avec",
    endsWith: "Se termine avec",
    group: "Groupe",
    columns: "Collone",
    rowGroupColumns: "laPivot Cols",
    rowGroupColumnsEmptyMessage: "la please drag cols to group",
    valueColumns: "laValue Cols",
    pivotMode: "laPivot-Mode",
    groups: "laGroups",
    values: "laValues",
    pivots: "laPivots",
    valueColumnsEmptyMessage: "la drag cols to aggregate",
    pivotColumnsEmptyMessage: "la drag here to pivot",
    noRowsToShow: "Aucun enregistrement à afficher",
    pinColumn: "laPin Column",
    valueAggregation: "laValue Agg",
    autosizeThiscolumn: "laAutosize Diz",
    autosizeAllColumns: "laAutsoie em All",
    groupBy: "laGroup by",
    ungroupBy: "laUnGroup by",
    resetColumns: "laReset Those Cols",
    expandAll: "laOpen-em-up",
    collapseAll: "laClose-em-up",
    toolPanel: "laTool Panelo",
    export: "Exorter",
    csvExport: "la CSV Exportp",
    excelExport: "la Excel Exporto",
    pinLeft: "laPin <<",
    pinRight: "laPin >>",
    noPin: "laDontPin <>",
    sum: "laSum",
    min: "laMin",
    max: "laMax",
    none: "laNone",
    count: "laCount",
    average: "laAverage",
    copy: "Copier",
    ctrlC: "ctrl n C",
    paste: "laPaste",
    ctrlV: "ctrl n C"
  };

  private selectedRecord;


  @ViewChild("addressSearch")
  public searchElementRef: ElementRef;

  constructor(private router: Router, private apiService: GoogleAPIService,
    private notificationService: NotificationService, private changeDetectorRef: ChangeDetectorRef,
    private contractorService: ContractorService, private souscripteurService: SouscripteurService,
    private missionService: MissionsService, private appRef: ApplicationRef, private toaster: ToastrService,
    private authService: AuthService, private ngZone: NgZone) {
    this.rowSelected = false;
    this.rowSelection = "single";
  }

  ngOnInit() {

    this.apiService.loadAPI.then((google: any) => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: "ma"}
      });

      this.map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: this.myLatLong,
        zoom: 15,


      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.myLatLong.lat = place.geometry.location.lat();
          this.myLatLong.lng = place.geometry.location.lng();
          //this.zoom = 12;

          this.marker.setPosition(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
          this.map.panTo(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));

        });
      });

      google.maps.event.addListener(this.map, 'click', (args) => {

        this.myLatLong.lat = args.latLng.lat();
        this.myLatLong.lng = args.latLng.lng();

        this.marker.setPosition(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
        this.map.panTo(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));

        this.geocoder.geocode({ 'location': this.myLatLong }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address);
              this.address = results[0].formatted_address;
              this.changeDetectorRef.detectChanges();
            }
          }
        })
      });
      document.getElementById('buttonNaviguer').addEventListener('click', (args) => {
        this.marker.setPosition(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
        this.map.panTo(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
    
        this.geocoder.geocode({ 'location': this.myLatLong }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address);
              this.address = results[0].formatted_address;
              this.changeDetectorRef.detectChanges();
            }
          }
        })
      });

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
        icon: this.iconSet.connected
      });

      this.geocoder = new google.maps.Geocoder;

      this.moveBus = function () {
        this.myLatLong.lat = this.myLatLong.lat + 0.01;
        this.myLatLong.lng = this.myLatLong.lng + 0.01;
        this.marker.setPosition(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));
        this.marker.setIcon(this.iconSet.connected);
        this.map.panTo(new google.maps.LatLng(this.myLatLong.lat, this.myLatLong.lng));

      }
      // this.fetchStyle(this.activeStyle)

      //setInterval(() => { this.moveBus(); }, 5000);


    })
  }

  @ViewChild('prestModal') public prestModal: ModalDirective;
  @ViewChild('lgModal') public lgModal: ModalDirective;


  public showChildModal(): void {
    this.lgModal.show();
  }

  public hideChildModal(): void {
    this.lgModal.hide();
  }

  public showPrestaModal(): void {
    this.prestModal.show();
  }

  public hidePrestaModal(): void {
    this.prestModal.hide();
  }

  public searchSubscriber(): void {

    this.SouscripteurGridgridApi.showLoadingOverlay();
    this.souscripteurService.searchSouscripteur(this.souscripteurSearchStr).subscribe(res => {

      this.SouscripteurGridrowData = [];
      this.souscripteurResult = res.value;
      this.SouscripteurGridrowData = res.value;

      this.SouscripteurGridgridApi.hideOverlay();
      this.SouscripteurGridgridApi.sizeColumnsToFit();

      if (this.SouscripteurGridrowData === null && this.SouscripteurGridrowData.length === 0) {
        this.SouscripteurGridgridApi.showNoRowsOverlay();
      }




    });

  }

  public searchPrestataire(): void {
    this.PrestataireGridgridApi.showLoadingOverlay();

    this.contractorService.searchContractor(this.contractSearchStr).subscribe(res => {

      this.PrestataireGridrowData = [];
      this.contractorsResult = res.value;
      this.PrestataireGridrowData = res.value;
      
      this.SouscripteurGridgridApi.hideOverlay();
      this.SouscripteurGridgridApi.sizeColumnsToFit();

      if (this.PrestataireGridrowData === null && this.PrestataireGridrowData.length === 0) {
        this.SouscripteurGridgridApi.showNoRowsOverlay();
      }
    
    });
  }

 

  public saveMission(event): void {
    event.preventDefault();
    var errorMessage = 'Veuillez Renseigner les informations suivantes pour créer votre mission: <br/>'
    var hasErrors = false;
    if (!this.selectedSouscripteur) {
      errorMessage += '- Souscripteur<br/>';
      hasErrors = true;
    }
    if (!this.selectedPrestataire) {
      errorMessage += '- Prestataire<br/>';
      hasErrors = true;
    }
    if (!this.address) {
      errorMessage += '- Adresse<br/>';
      hasErrors = true;
    }
    if (!this.numeroDossierSinistre) {
      errorMessage += '- Numéro du dossier d\'assistance<br/>';
      hasErrors = true;
    }
    if (this.myLatLong.lat === this.defaultLatLong.lat && this.myLatLong.lng === this.defaultLatLong.lng) {
      errorMessage += '- Coordonées GPS du sinistre<br/>';
      hasErrors = true;
    }

    if (hasErrors) {
      this.toaster.toastrConfig.enableHtml = true;
      this.toaster.error(errorMessage, 'Erreurs de validation');
      
      return;
    }

    var mission = {
      AvenantId: this.selectedSouscripteur.AvenantId,
      ContractName: this.selectedSouscripteur.ContractName,
      DateEcheance: this.selectedSouscripteur.DateEcheance,
      DateEffet: this.selectedSouscripteur.DateEffet,
      FirstName: this.selectedSouscripteur.FirstName,
      IncidentAddress: this.address,
      IncidentCity: "Casablanca",
      LastName: this.selectedSouscripteur.LastName,
      Latitude: this.myLatLong.lat,
      longitude: this.myLatLong.lng,
      //Phone1: this.selectedSouscripteur.Phone,
      Phone1: this.phone,
      PolicyNumber: this.selectedSouscripteur.PolicyNumber,
      SouscriptionId: this.selectedSouscripteur.SouscriptionId,
      ClaimNumber: this.numeroDossierSinistre,
      IncidentComment: this.commentaireDossier,

      ContractorId: this.selectedPrestataire.ContractorId,
      // Modification YAHYA 16/05/2022
      NumeroImmatriculation: this.numeroImmatriculation
      // Fin modification YAHYA 16/05/2022
    };
    this.missionService.saveMission(mission).subscribe(res => {
      if (res.value) {
        this.toaster.success("Succés", "Votre mission a été crée avec succés");
        
        this.router.navigate([this.authService.userHomePage]);
      }

    });
  }

  
  showPopup() {
    this.notificationService.smallBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "You can improve your security further after logging out by closing this opened browser",
      buttons: '[No][Yes]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Yes") {

      }
    });
  }

  onSouscripteurGridSelectionChanged() {

    var selectedRows = this.SouscripteurGridgridApi.getSelectedRows();

    this.selectedSouscripteur = selectedRows[0];
    this.phone = this.selectedSouscripteur.Phone;
    this.souscripteurSearchStr = this.selectedSouscripteur.FirstName + ' ' + this.selectedSouscripteur.LastName;

  }

  onSouscripteurGridGridReady(params) {
    this.SouscripteurGridgridApi = params.api;
    this.SouscripteurGridgridColumnApi = params.columnApi;
    this.SouscripteurGridgridApi.sizeColumnsToFit();


  }

  onSouscripteurGridRowDoubleClicked(params) {
    var selectedRows = this.SouscripteurGridgridApi.getSelectedRows();

    this.selectedSouscripteur = selectedRows[0];
    this.phone = this.selectedSouscripteur.Phone;
    this.souscripteurSearchStr = this.selectedSouscripteur.FirstName + ' ' + this.selectedSouscripteur.LastName;
    this.hideChildModal();
  }


  onPrestataireGridSelectionChanged() {

    var selectedRows = this.PrestataireGridgridApi.getSelectedRows();

    this.selectedPrestataire = selectedRows[0];
    this.contractSearchStr = this.selectedPrestataire.ContractorName;



  }

  onPrestataireGridGridReady(params) {
    this.PrestataireGridgridApi = params.api;
    this.PrestataireGridgridColumnApi = params.columnApi;
    //this.PrestataireGridgridColumnApi.sizeColumnsToFit();

    this.contractorService.getContractors().subscribe(data => {
      this.PrestataireGridrowData = data.value;
      this.PrestataireGridgridApi.hideOverlay();
      if (this.PrestataireGridrowData === null && this.PrestataireGridrowData.length === 0) {
        this.PrestataireGridgridApi.showNoRowsOverlay();
      }
    });
  }

  onPrestataireGridRowDoubleClicked(params) {
    var selectedRows = this.PrestataireGridgridApi.getSelectedRows();

    this.selectedPrestataire = selectedRows[0];
    this.contractSearchStr = this.selectedPrestataire.ContractorName;
    this.hidePrestaModal();
  }

}

