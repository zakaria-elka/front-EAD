import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../../service/http.service';
import { ToastrService } from 'ngx-toastr';
import { JsonApiService } from "../../core/api/json-api.service";
import { MissionsService } from "../../+missions/missions.service";
import { ConfigService } from "../../service/config.service";

@Component({
  selector: 'app-dashboardmanager',
  templateUrl: './dashboardmanager.component.html'
})
export class DashboardManagerComponent implements OnInit {

  public morrisDemoData: any;
  public missionsEchus: any;
  public missionsEnCours: any;
  public missionsNonAffectee: any;
  public missionsSearchResult: any;

  public missionEnCoursPageNumber: number = 1;
  public missionNonAffectePageNumber: number = 1;
  public missionEchuPageNumber: number = 1;


  private columnDefs = [
    { headerName: 'Prénom', field: 'FirstName' },
    { headerName: 'Nom', field: 'LastName' },
    { headerName: 'N° Police', field: 'PolicyNumber' },
    { headerName: 'Tel1', field: 'Phone1' },
    { headerName: 'Tel2', field: 'Phone2' },
    { headerName: 'N° Sinistre', field: 'ClaimNumber' },
    { headerName: 'Prestataire', field: 'ContractorName' },
    { headerName: 'Agent', field: 'AgentName' },
    {
      headerName: 'Date Sinistre', field: 'DateCreated', cellRenderer: params => {

        if (params.value !== null) {
          var date = new Date(params.value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else {
          return '-';
        }


      },
      useCellRendererInExport: true
    }


  ];

  private gridApi;
  private gridColumnApi;


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
    noRowsToShow: "aucun résult ne correspond à vos critéres de recherche",
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

  private searchStr: string;
  private dashboardStats: any;
 
  private chartSLA = [];

  private searchMode: string = 'Toutes les missions';

  constructor(private router: Router, private http: HttpService, private toastr: ToastrService,
    private jsonApiService: JsonApiService, private missionsService: MissionsService, private configService: ConfigService) { }

  ngOnInit() {

    this.rowSelected = false;
    this.rowSelection = "single";

    var dashboardSearchResultsOn = JSON.parse(localStorage.getItem('dashboardSearchResultsOn'));
    if (dashboardSearchResultsOn && dashboardSearchResultsOn.value === true) {
      this.missionsSearchResult = JSON.parse(localStorage.getItem('dashboardSearchResults'));
      this.searchStr = dashboardSearchResultsOn.searchStr;
    }
    

    this.missionsService.getMissionsEnCours().subscribe(res => {

      this.missionsEnCours = res.value;
    });
    this.missionsService.getMissionsEchusNonSync().subscribe(res => {

      this.missionsEchus = res.value;
    })

    this.missionsService.getMissionsNonAffectees().subscribe(res => {

      this.missionsNonAffectee = res.value;
    })

    this.configService.getConfig().subscribe(res => {
      this.chartSLA = [];
      this.chartSLA.push(res.value.MissionTotalDuration / 60);
      this.chartSLA.push(res.value.MissionAssignmentSLA / 60);
      this.chartSLA.push(res.value.MissionCheckinSLA / 60);
      this.chartSLA.push(res.value.MissionCloseSLA / 60);
      this.chartSLA.push(res.value.MissionSyncSLA / 60);
    });

    this.missionsService.getDashboardStats().subscribe(res => {

      this.dashboardStats = res.value;
      this.dashboardStats.graphData = [];
      this.dashboardStats.AverageTotalMissionTime.forEach(item => {

        var obj = {
          "Date": item.Date,
          "TotalMissionValue": item.Value,
          "AverageAssignmentValue": 0,
          "AverageCheckinValue": 0,
          "AverageCloseValue": 0,
          "AverageSyncValue": 0
        }
        obj.AverageAssignmentValue = this.dashboardStats.AverageAssignmentTime.filter(o => { return o.Date === obj.Date })[0].Value;
        obj.AverageCheckinValue = this.dashboardStats.AverageCheckinTime.filter(o => { return o.Date === obj.Date })[0].Value;
        obj.AverageCloseValue = this.dashboardStats.AverageCloseTime.filter(o => { return o.Date === obj.Date })[0].Value;
        obj.AverageSyncValue = this.dashboardStats.AverageSyncTime.filter(o => { return o.Date === obj.Date })[0].Value;

        this.dashboardStats.graphData.push(obj);
      });


    })

  }

  pageChangedMissionsEnCours(param) {
    this.missionEnCoursPageNumber = param;
  }

  pageChangedMissionsNonAffecte(param) {
    this.missionNonAffectePageNumber = param;
  }
  pageChangedMissionsEchu(param) {
    this.missionEchuPageNumber = param;
  }

  setSearchMode(param) {
    this.searchMode = param;
  }

  searchMissions(param) {
    this.missionsService.searchMissions(this.searchStr, this.searchMode).subscribe(res => {
      this.missionsSearchResult = res.value;
      setTimeout(() => {
        this.gridApi.hideOverlay();
        if (this.missionsSearchResult === null || this.missionsSearchResult.length === 0) {
          this.gridApi.showNoRowsOverlay();
        }
        else {
          localStorage.setItem('dashboardSearchResultsOn', JSON.stringify({ value: true, searchStr: this.searchStr }));
          localStorage.setItem('dashboardSearchResults', JSON.stringify(this.missionsSearchResult));
        }
      }, 1000);

    });
  }


  clearSearch(param) {
    param.preventDefault();
    this.missionsSearchResult = null;
    localStorage.setItem('dashboardSearchResultsOn', null);
    localStorage.setItem('dashboardSearchResults', null);
  }

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

  public showDetailMission(missionId) {
    this.router.navigate(['/missions/detail/' + missionId]);
  }

  public assignMission(missionId) {
    this.router.navigate(['/missions/assign/' + missionId]);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }


  barColorsDemo(row, series, type) {
    if (type === 'bar') {
      var red = Math.ceil(150 * row.y / 8);
      return 'rgb(' + red + ',0,0)';
    } else {
      return '#000';
    }
  }

  percentageFormat(x) {
    return x + "%"
  }

  dateFormat(d) {
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  }

}


