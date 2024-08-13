import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-show-data-base-details',
  templateUrl: './show-data-base-details.component.html',
  styleUrls: ['./show-data-base-details.component.css']
})
export class ShowDataBaseDetailsComponent implements OnInit {
  tableHeader: string[] = [];
  tableData: any[] = [];
  pageType!: string;
  showFilter: boolean = false;
  userFilter: any = {
    name: '',
    phoneNumber: '',
    email: '',
    country: '',
    UKDrivinglicense: '',
    nationality: '',
    currentWork: ''
  }
  ACRFilter: any = {

  }
  cardFilter: any = {
    rolesInDemand: '',
    roleDescription: '',
    type: '',
    certifications_qualifications: '',
    valueA: '',
    valueB: '',
    valueC: ''
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private notificationService: NotificationService
  ) {
    this.route.params.pipe().subscribe((params) => {
      if (params['type']) {
        this.pageType = params['type'];
      } else {
        this.router.navigate(['/database/lits']);
      }
    });
  }

  ngOnInit(): void {
    this.getTableDetails();
  }

  getTableDetails() {
    let filter: any = {}
    if (this.pageType == 'User') {
      this.tableHeader = [
        'Sr No.',
        'Name',
        'Email',
        'Country Code',
        'Phone Number',
        'Nationality',
        'UK Driving License',
        'UK Visa Type',
        'Current Location',
        'notice period (Days)',
        'Current Work',
        'Looking For',
        'Work Location',
        'Expected Day Rate',
        'Referred By',
        'Any SC_DV ?',
        'Resume',
        'Are you willing to undertake',
        'Call Day',
        'Call Time',
        'Any Question',
        'Profile',
      ]
      filter = this.userFilter;

    } else if (this.pageType == 'ACRUser') {
      this.tableHeader = [
        'Agency Name',
        'Location',
        'Number Of Branches In UK',
        'Person Name',
        'Person Designation',
        'User Name',
        'person Email',
        'phone Number',
        'Contact Details',
        'Emergency Secondary Contact Details',

        'Created At',
        'Updated At'
      ]

      filter = this.ACRFilter;
    } else if (this.pageType == 'card') {
      this.tableHeader = [
        'Role Demand',
        'Role Description',
        'Type',
        'Qualifications Certificate',
        'Value A',
        'Value B',
        'Value C',
        'Document',
        'Created At',
        'Updated At'
      ]
      filter = this.cardFilter;
    } else if (this.pageType == 'client') {
      this.tableHeader = ['Name', 'Gender', 'UserType', 'Location', 'JobType', 'Rate']
    }
    // Here is call get details API for table
    const payload = {
      modelName: this.pageType
    }
    this.databaseService.getModelData(payload, filter).subscribe((response) => {
      if (response?.status) {
        this.tableData = response.data;
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    })
  }

  openDocument(document: any) {
    window.open(document?.url, '_blank', 'noopener, noreferrer');
  }

  downloadAsExcel() {
    this.databaseService.ExportToExcel(this.tableData, "usersList");
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  resetFilter() {
    this.ACRFilter = {};
    this.cardFilter = {};
    this.userFilter = {};
    this.getTableDetails();
  }
}
