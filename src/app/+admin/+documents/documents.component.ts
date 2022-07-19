import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl, FormBuilder, NgModel  } from "@angular/forms";
import { NotificationService } from "../../shared/utils/notification.service";
import { DocumentTypeService } from "../../service/document-type.service";
import { MissionTypeService } from "../../service/mission-type.service";
import { ModalDirective } from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styles: []
})
export class DocumentsComponent implements OnInit {

  private columnDefs = [
    { headerName: 'Type de Mission', field: 'MissionTypeName' },
    { headerName: 'Type de Document', field: 'DocumentTypeName' },
    {
      headerName: 'Rerquis', field: 'Mandatory', cellRenderer: params => {
        if (params.value === true) {
          return '<span class="txt-color-green"><i class="fa fa-check-square-o"></i></span>';
        } else {
          return '<span class="txt-color-red"><i class="fa fa-times-circle-o"></i></span>';
        }

      }
    },

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
    MissionTypeId: '',
    DocumentTypeName: '',
    Mandatory: ''

  }

  private missionTypeList = [];

  private editAction;

  private options = { standalone: true };

  @ViewChild('detailModal') public detailModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;

  private editForm: FormGroup;

  constructor(private router: Router, private notificationService: NotificationService,
    private documentTypeService: DocumentTypeService, private missionTypeService: MissionTypeService, private toaster: ToastrService) { }


  ngOnInit() {
    this.rowSelected = false;
    this.rowSelection = "single";

    //this.editForm = new FormGroup({
    //  'documentTypeName': new FormControl(this.newRecordModel.DocumentTypeName, [Validators.required, Validators.minLength(2)]),
    //  'missionTypeName': new FormControl(this.newRecordModel.MissionTypeId, [Validators.required, Validators.minLength(2)]),
    //  'mandatory': new FormControl(this.newRecordModel.Mandatory)
    //})

    this.missionTypeService.getAllMissionType().subscribe(data => {
      this.missionTypeList = data.value;
    });
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

  @ViewChild('documentTypeName') public documentTypeName: NgModel;
  @ViewChild('missionTypeName') public missionTypeName: NgModel;
  
  //private documentTypeName;

  public saveRecordClick(): void {
    this.documentTypeName.control.markAsTouched();
    this.missionTypeName.control.markAsTouched();
    
    var isValid = this.documentTypeName.valid && this.missionTypeName.valid;
    if (!isValid) {
      return;
    }
    if (this.editAction === "Ajouter") {
      this.documentTypeService.addDocumentType(this.newRecordModel).subscribe(data => {

        this.toaster.success("Le type de document a été crée avec succés", "Succés");
        this.hideEditModal();

        this.newRecordModel = {
          MissionTypeId: '',
          DocumentTypeName: '',
          Mandatory: ''
        }

        this.clearGridSelection();
      });
    }
    else if (this.editAction === "Modifier") {
      this.documentTypeService.updateDocumentType(this.newRecordModel).subscribe(data => {

        this.toaster.success("Le type de document a été mis à jour avec succés", "Succés");
        this.hideEditModal();

        this.newRecordModel = {
          MissionTypeId: '',
          DocumentTypeName: '',
          Mandatory: ''
        }

        this.clearGridSelection();
       
      });
    }

  }


  public modalHidden(param) {
    this.newRecordModel = {
      MissionTypeId: '',
      DocumentTypeName: '',
      Mandatory: ''
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
      fileName: 'export-list-typedocument.csv',
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
    this.documentTypeService.getDocumentTypes().subscribe(data => {
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
      content: "Êtes-vous sûr de vouloir supprimer ce type de document?",
      buttons: '[Non][Supprimer]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Supprimer") {
        this.documentTypeService.deleteDocumentType(this.selectedRecord.DocumentTypeId).subscribe(data => {
          this.toaster.success("Le type de document a été supprimé", "Succés");

          this.loadGridData();
          this.clearGridSelection();
        });
      }
    });

  }



}

