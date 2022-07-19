import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/utils/notification.service";
import { InsuranceCompanyService } from '../../service/insurance-company.service';
import { ModalDirective } from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-steassurance',
  templateUrl: './steassurance.component.html',
  styles: []
})
export class SteAssuranceComponent implements OnInit {

  private columnDefs = [
    { headerName: 'Nom de la société', field: 'InsuranceCompanyName' },
    { headerName: 'Code société', field: 'InsuranceCompanyCode' }
    
  ];

  private rowData = [];

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



  private newRecordModel = {
    InsuranceCompanyName: '',
    InsuranceCompanyCode: ''
   
  }


  private editAction;

  @ViewChild('detailModal') public detailModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('insuranceCompanyName') public insuranceCompanyName: NgModel;
  @ViewChild('insuranceCompanyCode') public insuranceCompanyCode: NgModel;

  constructor(private router: Router, private notificationService: NotificationService,
     private insuranceCompanyService: InsuranceCompanyService, private toaster: ToastrService) { }


  ngOnInit() {
    this.rowSelected = false;
    this.rowSelection = "single";   
  }



  //----------- Modal Events -----------------//

  public showDetailModal(): void {
    this.detailModal.show();
  }

  public hideDetailModal(): void {
    this.detailModal.hide();
  }

  public showEditModal(): void {
    this.editModal.show();
  }

  public hideEditModal(): void {
    this.editModal.hide();
  }

  public saveRecordClick(): void {
    this.insuranceCompanyName.control.markAsTouched();
    this.insuranceCompanyCode.control.markAsTouched();

    var isValid = this.insuranceCompanyName.valid && this.insuranceCompanyCode.valid;

    if (!isValid) {
      return;
    }
    if (this.editAction === "Ajouter") {
      this.insuranceCompanyService.createNewInsuranceCompany(this.newRecordModel).subscribe(data => {

        this.toaster.success("La société d'assurance a été crée avec succés", "Succés");
        this.hideEditModal();

        this.newRecordModel = {
          InsuranceCompanyName: '',
          InsuranceCompanyCode: ''
        }

        this.loadGridData();
        this.clearGridSelection();
      });
    }
    else if (this.editAction === "Modifier") {
      this.insuranceCompanyService.updateInsuranceCompany(this.newRecordModel).subscribe(data => {

        this.toaster.success("La société d'assurance a été mis à jour avec succés", "Succés");
        this.hideEditModal();

        this.newRecordModel = {
          InsuranceCompanyName: '',
          InsuranceCompanyCode: ''
        }

        this.loadGridData();
        this.clearGridSelection();
      });
    }
   
  }


  public modalHidden(param) {
    this.newRecordModel = {
      InsuranceCompanyName: '',
      InsuranceCompanyCode: ''
    }
  }


  clearGridSelection() {
    this.loadGridData();
    this.gridApi.deselectAll();
    this.selectedRecord = null;
    this.rowSelected = false;
  }

  //----------- Grid Events -----------------//
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows !== null && selectedRows.length > 0) {
      this.rowSelected = true;
      this.selectedRecord = selectedRows[0];
    }
   
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.showLoadingOverlay();

    this.loadGridData();

  }

  onRowDoubleClicked(params) {
    this.showDetailModal();
  }

  exportToCsvClick(params) {
    var options = {
      fileName: 'export-list-prestataire.csv',
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


  //----------- data methods -----------------//
  loadGridData() {
    this.insuranceCompanyService.getAllCompanies().subscribe(data => {
      this.rowData = data.value;
      this.gridApi.hideOverlay();
      if (this.rowData === null && this.rowData.length === 0) {
        this.gridApi.showNoRowsOverlay();
      }
    });
  }

  addNewRecordClick(params) {
    this.editAction = "Ajouter";
    this.showEditModal();
  }
  editSelectedRecordClick(params) {
    this.editAction = "Modifier";
    this.newRecordModel = this.selectedRecord;
    this.showEditModal();
  }

  deleteSelectedRecordClick(params) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Êtes-vous sûr de vouloir supprimer cette société d'assurance?",
      buttons: '[Non][Supprimer]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Supprimer") {
        this.insuranceCompanyService.deleteInsuranceCompany(this.selectedRecord.InsuranceCompanyId).subscribe(data => {
          this.toaster.success("La société d'assurance a été supprimé", "Succés");
          
          this.loadGridData();
          this.clearGridSelection();
        });
      }
    });

  }

  




}
