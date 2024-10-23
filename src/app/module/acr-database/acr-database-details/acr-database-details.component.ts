import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';

@Component({
  selector: 'app-acr-database-details',
  templateUrl: './acr-database-details.component.html',
  styleUrls: ['./acr-database-details.component.css']
})
export class AcrDatabaseDetailsComponent implements OnInit {
  tableHeader: string[] = [];
  tableData: any[] = [];
  pageType!: string;
  showFilter: boolean = false;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

  userFilter: any = {
    name: '',
    phoneNumber: '',
    email: '',
    country: '',
    agencyName: ''
  }
  
  JobFilter: any = {
    jobTitle: '',
    clientName: '',
    status: '',
    location: '',
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
        "Sr No",
        "Agency Name",
        "Location",
        "Number of Branches in UK",
        "Person Name",
        "Person Designation",
        "Person Email",
        "Phone Number Country Code",
        "Phone Number",
        "Secondary Contact Name",
        "Secondary Designation",
        "Secondary Email",
        "Secondary Phone Number Country Code",
        "Secondary Phone Number",
        "Contact Time",
        "Password Reset",
        "Applied Role",
        "Profile",
        "Created At",
        "Updated At"
      ]
      filter = this.userFilter;
      const payload = {
        page: this.page,
        page_size: this.pagesize
      }
      this.databaseService.getUserList(payload, filter).subscribe((response) => {
        if (response?.status) {
          this.tableData = response?.data;
          this.totalRecords = response?.meta_data?.items;
        } else {
          this.notificationService.showError(response?.message || 'Resume not uploaded.')
        }
      });

    } else if (this.pageType == 'Job') {
      this.tableHeader = [
        "Sr no",
        "Job Title",
        "Number of Roles",
        "Start Date",
        "Publish Date",
        "Client Name",
        "Location",
        "Day Rate",
        "Applicants",
        "Upload Key",
        "Upload URL",
        "Timer End",
        "Job Time Left",
        "Status"
      ]

      filter = this.JobFilter;
      const payload = {
        page: this.page,
        page_size: this.pagesize
      }
    // Here is call get details API for job
    this.databaseService.getJobList(payload,filter).subscribe((response) => {
      if (response?.status) {
        this.tableData = response?.data;
        this.totalRecords = response?.meta_data?.items;
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    });
  }
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
    this.JobFilter = {};
    this.userFilter = {};
    this.getTableDetails();
  }


  paginate(page: number) {
    this.page = page;
    this.getTableDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
