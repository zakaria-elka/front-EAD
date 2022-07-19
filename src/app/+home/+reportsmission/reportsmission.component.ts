import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { JsonApiService } from "../../core/api/json-api.service";
import { ConfigService } from "../../service/config.service";
import { NotificationService } from 'app/shared/utils/notification.service';
import { ContractorService } from 'app/service/contractor.service';
import { InsuranceCompanyService } from 'app/service/insurance-company.service';
import { MissionsService } from 'app/+missions/missions.service';

@Component({
  selector: 'app-reportsmission',
  templateUrl: './reportsmission.component.html',
  styleUrls: ['./reportsmission.component.css']
})
export class ReportsMissionComponent implements OnInit {

  

  private columnDefs = [
    { headerName: 'Nom', field: 'FirstName' },
    { headerName: 'Prénom', field: 'LastName' },
    { headerName: 'N° Tel 1', field: 'Phone1' },
    { headerName: 'N° Tel 2', field: 'Phone2', cellRenderer: params => {
        if(params.value === null){
          return '-'
        }
        return params.value;
      },
      useCellRenderInExport: true 
    },
    { headerName: 'N° Contrat', field: 'PolicyNumber' },
    { headerName: 'N° Dossier', field: 'ClaimNumber' },
    { headerName: 'N° d\'immatriculation', field: 'NumeroImmatriculation', cellRenderer: params => {
        if(params.value === null){
          return '-'
        }
        return params.value;
      },
      useCellRenderInExport: true
    },
    { headerName: 'Créer par', field: 'CreatedBy' },
    { headerName: 'Prestataire', field: 'ContractorName' },
    { headerName: 'Adresse', field: 'IncidentAddress' },
    { headerName: 'Agent missionné', field: 'AgentName', cellRenderer: params => {
      if (params.value === null) {
        return '-'
      }
      else{
        return params.value
      }
    },
    useCellRendererInExport: true
    },
    { headerName: 'Tél agent', field: 'AgentPhoneNumber' , cellRenderer: params => {
      if (params.value === null) {
        return '-'
      }
      return params.value
    },
    useCellRendererInExport: true},
    { headerName: 'Statut', field: 'MissionStatusId', cellRenderer: params => {

        return this.renderStatusIdToName(params);
      },
      useCellRendererInExport: true
    },
    { headerName: 'Date création', field: 'DateCreated', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    },
    { headerName: 'Date d\'affectation', field: 'DateAffected', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    },
    { headerName: 'Date d\'arrivée', field: 'DateArrived', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    },
    { headerName: 'Date de clôture', field: 'DateClosed', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    },
    { headerName: 'Date de synchronisation', field: 'DateSynced', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    },
    { headerName: 'Date dernière modification', field: 'DateModified', cellRenderer: params => {
        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
          return '-'
      },
      useCellRendererInExport: true
    },
    { headerName: 'Nbr de pièces jointes', field: 'MissionImagesCount' },
    { headerName: 'Nbr de pièces synchornisées', field: 'MissionImageSynced' }

  ];

  private rowData = [];

  private gridApi;
  private gridColumnApi;

  private rowSelection;
  private rowSelected;

  private selectedRecord;


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


  private contractorsList = [];
  private insuranceCompanyList = [];


  constructor(private router: Router, private notificationService: NotificationService,
    private missionsService: MissionsService, private contractorService: ContractorService, private insuranceCompanyService: InsuranceCompanyService) { }


  ngOnInit() {

    this.rowSelected = false;
    this.rowSelection = "single";

    this.contractorService.getContractors().subscribe(data => {
      this.contractorsList = data.value;
    })

    this.insuranceCompanyService.getAllCompanies().subscribe(data => {

      this.insuranceCompanyList = data.value;
    })
  }



  
//--------------------------- Grid Events -------------//
autoSizeAll() {
  const allColumnIds: string[] = [];
  this.gridColumnApi.getAllColumns()!.forEach((column) => {
    allColumnIds.push(column.getId());
  });
  this.gridColumnApi.autoSizeColumns(allColumnIds, false);
}
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.loadGridData();
    this.gridApi.autoSizeAll();
  }
// --------------------- export Events ------------------- //
  exportMissionToCsv(params) {
    var options = {
      fileName: 'export-dashboard-mission.csv',
      processCellCallback: function (params) {
        if (params.column.colDef.useCellRendererInExport === true) {
          return params.column.colDef.cellRenderer(params);
        }
        else {
          return params.value;
        }
      }
    }
    this.gridApi.exportDataAsCsv(options);
  }

//---------------- Row selection ------------- //
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows !== null && selectedRows.length > 0) {
      this.rowSelected = true;
      this.selectedRecord = selectedRows[0];
    }
  }

  onRowDoubleClicked(params) {
    this.router.navigate(['/missions/detail/' + this.selectedRecord.MissionId]);
  }

// --------------- Grid Events  -------------- //

  loadGridData(){
    this.gridApi.showLoadingOverlay();
    this.missionsService.getMissions().subscribe(data => {
      this.rowData = data.value;
      //this.gridApi.hideOverlay();
      if (this.rowData === null && this.rowData.length === 0) {
        this.gridApi.showNoRowsOverlay();
      }
      
    });
  }
  

  renderStatusIdToName(params){
    if (params.value !== null) {
      if(params.value === 1){
        return 'En attente d\'Affectation';
      }
      else if(params.value ===2){
        return 'En Route';
      }
      else if(params.value===3){
        return 'En Cours d\'Exécution';
      }
      else if(params.value === 4){
        return 'En Attente de Synchronisation';
      }
      else if(params.value === 5){
        return 'Synchronisée';
      }
      else if(params.value === 99){
        return 'Annulée';
      }
    } else {
      return '-';
    }
  }

  
}

