import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../service/users.service';
import { NotificationService } from "../../shared/utils/notification.service";
import { ContractorService } from '../../service/contractor.service';
import { InsuranceCompanyService } from '../../service/insurance-company.service';
import { ModalDirective } from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../+auth/auth.service';
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  private columnDefs = [
    { headerName: 'Prénom', field: 'FirstName' },
    { headerName: 'Nom', field: 'LastName' },
    { headerName: 'Tel', field: 'MobilePhone' },
    { headerName: 'Nom d\'utilisateur', field: 'UserName' },
    { headerName: 'Role', field: 'RoleName' },
    {
      headerName: 'Actif', field: 'Active', cellRenderer: params => {
        if (params.value === true) {
          return '<span class="txt-color-green"><i class="fa fa-check-square-o"></i></span>';
        } else {
          return '<span class="txt-color-red"><i class="fa fa-times-circle-o"></i></span>';
        }

      }
    },
    {
      headerName: 'Dernière connexion', field: 'LastLogin', cellRenderer: params => {

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

  private selectedUser;


  private userModel = {
    FirstName: '',
    LastName: '',
    Email: '',
    MobilePhone: '',
    Username: '',
    Password: '',
    ConfirmPassword: '',
    ContractorId: '',
    InsuranceCompanyId: '',
    RoleId: '',
    Role: {},
    UserId: '',
    UserName: ''
  }

  // Modification YAHYA-B 29/03/2022 
  private changePasswordModel = {
    userId: 0,
    NewPassword: '',
    ConfirmPassword:''
    
  }
  // Fin modification YAHYA-B 29/03/2022


  private editAction;

  @ViewChild('detailModal') public detailModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;

//Modification YAHYA-B 29/03/2022

@ViewChild('changePasswordModal') public changePasswordModal: ModalDirective;

//Fin modification YAHYA-B

  @ViewChild('firstName') public firstName: NgModel;
  @ViewChild('lastName') public lastName: NgModel;
  @ViewChild('email') public email: NgModel;
  @ViewChild('mobilePhone') public mobilePhone: NgModel;
  @ViewChild('username') public username: NgModel;
  @ViewChild('password') public password: NgModel;
  @ViewChild('confirmPassword') public confirmPassword: NgModel;
  @ViewChild('roleId') public roleId: NgModel;
  @ViewChild('insuranceCompanyId') public insuranceCompanyId: NgModel;
  @ViewChild('contractorId') public contractorId: NgModel;

  private rolesList = [];
  private contractorsList = [];
  private insuranceCompanyList = [];
  private showInsuranceCompany = false;
  private showContractors = false;
  private passwordNotMatch: boolean = false;
  constructor(private router: Router, private notificationService: NotificationService,
    private usersService: UsersService, private contractorService: ContractorService, private insuranceCompanyService: InsuranceCompanyService,
    private toaster: ToastrService, private authService: AuthService) { }


  ngOnInit() {
    this.rowSelected = false;
    this.rowSelection = "single";
    this.usersService.getRoles().subscribe(data => {
      this.rolesList = data.value;
    });

    this.contractorService.getContractors().subscribe(data => {
      this.contractorsList = data.value;
    })

    this.insuranceCompanyService.getAllCompanies().subscribe(data => {

      this.insuranceCompanyList = data.value;
    })
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

// Modification YAHYA-B 29/03/2022

  public showChangePasswordModal(): void {
    this.changePasswordModal.show();
  }

  public hideChangePasswordModal(): void {
    this.changePasswordModal.hide();
  }

  changePasswordUser(params) {
    this.editAction = "Changer mot de passe";
    //debugger;
    //this.hideDetailModal();
    this.showChangePasswordModal();

  }
//Fin modification YAHYA-B

  addNewUser(params) {
    this.editAction = "Ajouter";
    this.showEditModal();
  }
  editSelectedUser(params) {
    this.editAction = "Modifier";
    debugger;
    this.userModel = this.selectedUser;
    this.setDropdownsVisibility(this.selectedUser.RoleId);
    this.showEditModal();
  }


  onRoleSelectionChange(newValue) {


    this.userModel.ContractorId = '';
    this.userModel.InsuranceCompanyId = '';

    this.setDropdownsVisibility(newValue);
  }

  setDropdownsVisibility(newValue) {
    if (newValue === 4 || newValue === 5) {
      this.showContractors = true;
      this.showInsuranceCompany = false;
    }
    else if (newValue === 6) {
      this.showContractors = false;
      this.showInsuranceCompany = true;
    }
    else {
      this.showContractors = false;
      this.showInsuranceCompany = false;
    }
  }

  public saveUserClick(): void {
    if (this.authService.isUserPrestataire()) {
      if(this.userModel.RoleId==='')
        this.userModel.RoleId = '5';
      this.userModel.ContractorId = this.authService.contractorId;
    }

    this.firstName.control.updateValueAndValidity();
    this.lastName.control.updateValueAndValidity();
    this.email.control.updateValueAndValidity();
    this.mobilePhone.control.updateValueAndValidity();
    this.username.control.updateValueAndValidity();
    this.password.control.updateValueAndValidity();
    this.confirmPassword.control.updateValueAndValidity();
    this.roleId.control.updateValueAndValidity();
    this.insuranceCompanyId.control.updateValueAndValidity();
    this.contractorId.control.updateValueAndValidity();

    this.firstName.control.markAsTouched();
    this.lastName.control.markAsTouched();
    this.email.control.markAsTouched();
    this.mobilePhone.control.markAsTouched();
    this.username.control.markAsTouched();
    this.password.control.markAsTouched();
    this.confirmPassword.control.markAsTouched();
    this.roleId.control.markAsTouched();
    this.insuranceCompanyId.control.markAsTouched();
    this.contractorId.control.markAsTouched();

    var isValid = this.firstName.valid && this.lastName.valid
      && this.email.valid && this.mobilePhone.valid
      && this.username.valid && this.roleId.valid;
    
    // Modification YAHYA-B 29/03/2022
    var isValidChangePassword = true;
    // Fin modification YAHYA-B 29/03/2022
    if (this.editAction !== "Modifier") {
      isValid = isValid && this.password.valid
        && this.confirmPassword.valid;
      isValidChangePassword = isValidChangePassword && this.password.valid
      && this.confirmPassword.valid;

      if (this.userModel.Password !== this.userModel.ConfirmPassword) {
        this.passwordNotMatch = true;
        isValid = isValid && false;
        isValidChangePassword = isValidChangePassword && false;
      }
    }

    if (this.userModel.RoleId === '4' || this.userModel.RoleId === '5') {
      isValid = isValid && this.contractorId.valid;
    }

    if (this.userModel.RoleId === '6') {
      isValid = isValid && this.insuranceCompanyId.valid;
    }
    
    if (!isValid && this.editAction != "Changer mot de passe") {
      return;
    }
    else if(!isValidChangePassword && this.editAction === "Changer mot de passe"){
      return;
    }
    

    this.userModel.UserName = this.userModel.Username;

    if (this.editAction === "Ajouter") {

      this.usersService.checkUsername(this.userModel.Username).subscribe(data => {
        if (data.value === true) {
          this.usersService.createNewUser(this.userModel).subscribe(data => {

            this.toaster.success("L'utilisateur a été crée avec succés", "Succés");
            this.hideEditModal();

            this.userModel = {
              FirstName: '',
              LastName: '',
              Email: '',
              MobilePhone: '',
              Username: '',
              Password: '',
              ConfirmPassword: '',
              ContractorId: '',
              InsuranceCompanyId: '',
              RoleId: '',
              Role: {},
              UserId: '',
              UserName: ''
            }

            this.loadGridData();
            this.clearGridSelection();
          });
        }
        else {
          this.toaster.error("Le nom d'utilisateur utilisé existe déjà. Veuillez en choisir un autre", "Erreur")
        }
      });
      
    }
    else if (this.editAction === "Modifier") {

      this.usersService.updateUser(this.userModel).subscribe(data => {

        this.toaster.success("L'utilisateur a été mis à jour avec succés", "Succés");
        this.hideEditModal();
        /*this.userModel = {
          FirstName: '',
          LastName: '',
          Email: '',
          MobilePhone: '',
          Username: '',
          Password: '',
          ConfirmPassword: '',
          ContractorId: '',
          InsuranceCompanyId: '',
          RoleId: '',
          Role: {},
          UserId: '',
          UserName: ''
        }*/
        this.loadGridData();
        this.clearGridSelection();
        
      });

      
    }
    //Modification YAHYA-B 29/03/2022
    else if (this.editAction === "Changer mot de passe") {

      this.changePasswordModel = {
        userId : this.selectedUser.UserId,
        NewPassword: this.userModel.Password,
        ConfirmPassword: this.userModel.ConfirmPassword
      }
      
      this.usersService.changePassword(this.changePasswordModel).subscribe(data => {
        if(data.value === true){
          this.toaster.success("Le mot de passe de l'utilisateur a été mis à jour avec succés", "Succés");
          this.hideChangePasswordModal();
          this.changePasswordModel = {
            userId: 0,
            NewPassword:'',
            ConfirmPassword:''
          }
        }
      });
      //this.showEditModal();
    }
  }


// Fin modification YAHYA-B 29/03/2022
  public modalHidden(param) {
    this.userModel = {
      FirstName: '',
      LastName: '',
      Email: '',
      MobilePhone: '',
      Username: '',
      Password: '',
      ConfirmPassword: '',
      ContractorId: '',
      InsuranceCompanyId: '',
      RoleId: '',
      Role: {},
      UserId: '',
      UserName: ''
    }

    this.onRoleSelectionChange(0);
  }
  clearGridSelection() {
    this.loadGridData();
    this.gridApi.deselectAll();
    this.selectedUser = null;
    this.rowSelected = false;
  }

  //----------- Grid Events -----------------//
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows !== null && selectedRows.length > 0) {
      this.rowSelected = true;
      this.selectedUser = selectedRows[0];
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

  exportToCsv(params) {
    var options = {
      fileName: 'export-list-utilisateur.csv',
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
    this.usersService.getAllUsersByRole(this.authService.roleId).subscribe(data => {
      this.rowData = data.value;
      this.gridApi.hideOverlay();
      if (this.rowData === null && this.rowData.length === 0) {
        this.gridApi.showNoRowsOverlay();
      }
    });
  }

  activateUser(params) {
    this.usersService.activateUser(this.selectedUser.UserId).subscribe(data => {
      this.toaster.success("L'utilisateur a été activé", "Succés");
      this.selectedUser.Active = true;
      this.loadGridData();

      this.clearGridSelection();
    });
  }

  deleteUser(params) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Êtes-vous sûr de vouloir supprimer cet utilisateur?",
      buttons: '[Non][Supprimer]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Supprimer") {
        if(this.authService.userId==this.selectedUser.UserId){
          this.toaster.warning("Impossible de supprimer le compte courant!", "Attention");
        }else{
        this.usersService.deleteUser(this.selectedUser.UserId).subscribe(data => {
          this.toaster.success("L'utilisateur a été supprimé", "Succés");
          this.selectedUser.Active = true;
          this.loadGridData();

          this.clearGridSelection();
        });
      }
      }
    });

  }

  initPassword(params) {
    this.notificationService.smartMessageBox({
      title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
      content: "Êtes-vous sûr de vouloir réinitialiser le mot de passe de cet utilisateur?",
      buttons: '[Non][Réinitialiser]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Réinitialiser") {
        setTimeout(() => {
          this.usersService.resetPassword(this.selectedUser.UserId).subscribe(data => {
            //this.toaster.success("Le mot de passe de l'utilisateur a été réinitalisé. Le nouveau", "Succés");
            this.notificationService.smartMessageBox({
              title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> Confirmation <span class='txt-color-orangeDark'><strong></strong></span> ?",
              content: "Le mot de passe de l'utilisateur a été réinitalisé. Le nouveau mot de passe est : " + data.value,
              buttons: '[Ok]'
            });
            this.selectedUser.Active = true;
            this.loadGridData();

            this.clearGridSelection();
          });
        },500);
        
      }
    });
  }
}


