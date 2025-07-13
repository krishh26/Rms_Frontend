import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';
import Swal from 'sweetalert2';

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
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

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

  JobFilter: any = {
    keyword: ""
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
    private notificationService: NotificationService,
    private acrServiceService: AcrServiceService,
    private cirServiceService: CirSericeService
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
        'UK Visa Type',
        'UK Driving License',
        'Current Location',
        'notice period (Days)',
        'Current Work',
        'Looking For',
        'Work Preference',
        'Expected Day Rate',
        'Referred By',
        'Any SC_DV ?',
        // 'Are you willing to undertake',
        'Call Day',
        'Call Time',
        "Preferred Roles",
        // 'Client 1 : Machester Only',
        // 'Client 2 : Northan Ireland Only',
        // 'Client 3 : All Over UK',
        'Any Question',
        'Profile',
        'Resume',
      ]
      filter = this.userFilter;

      // Here is call get details API for table
      const payload = {
        modelName: this.pageType,
        page: this.page,
        page_size: this.pagesize
      }
      this.databaseService.getModelData(payload, filter).subscribe((response) => {
        if (response?.status) {
          this.tableData = response?.data;
          this.totalRecords = response?.meta_data?.items;
        } else {
          this.notificationService.showError(response?.message || 'Resume not uploaded.')
        }
      })

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
        'Name',
        'Location',
        'Status',
        'Created At',
        'Action'
      ]

      filter = this.cardFilter;
      const payload = {
        page: this.page,
        limit: this.pagesize,
        keyword: this.JobFilter.keyword
      }

      // Here is call get details API for job
      this.cirServiceService.getFutureCard(payload).subscribe((response) => {
        if (response?.status) {
          this.tableData = response?.data;
          this.totalRecords = response?.meta_data?.items;
        } else {
          this.notificationService.showError(response?.message || 'Resume not uploaded.')
        }
      });

    } else if (this.pageType == 'client') {
      this.tableHeader = ['Name', 'Gender', 'UserType', 'Location', 'JobType', 'Rate']
    } else if (this.pageType == 'Job') {
      this.tableHeader = [
        "Sr no",
        "Job ID",
        "Job Title",
        "Number of Roles",
        "Start Date",
        "Publish Date",
        "Client Name",
        "Location",
        "Day Rate",
        "Status",
        // "Upload Key",
        "Read Me Document",
        // "Timer End",
        "Job Expired Date",
        // "Status",
        "Action"
      ]

      const payload = {
        page: this.page,
        limit: this.pagesize,
        keyword: this.JobFilter.keyword
      }

      // Here is call get details API for job
      this.acrServiceService.getCirJobList(payload).subscribe((response) => {
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
    this.ACRFilter = {};
    this.cardFilter = {};
    this.userFilter = {};
    this.JobFilter = {};
    this.getTableDetails();
  }


  paginate(page: number) {
    this.page = page;
    this.getTableDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Function to be used for the delete job
  deleteJob(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this job ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.acrServiceService.deleteCIRJob(id).subscribe((response: any) => {
          if (response?.status == true) {
            this.notificationService.showSuccess('Job successfully deleted');
            this.getTableDetails();
          } else {
            this.notificationService.showError(response?.message);
          }
        }, (error) => {
          this.notificationService.showError(error?.error?.message);
        });
      }
    });
  }

  // Function to be used for the delete future card
  deleteFutureCard(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this card ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.cirServiceService.deleteFutureCard(id).subscribe((response: any) => {
          if (response?.status == true) {
            this.notificationService.showSuccess('Card successfully deleted');
            this.getTableDetails();
          } else {
            this.notificationService.showError(response?.message);
          }
        }, (error) => {
          this.notificationService.showError(error?.error?.message);
        });
      }
    });
  }

  redirectToCardDetailsPage(type: string) {
    this.router.navigateByUrl('/database/card/details/' + type);
  }

  appliedRoleData(jobId : string) {
    this.router.navigateByUrl(`/database/job-applications/${jobId}`)
  }

  viewSendMail(id: string) {
      this.router.navigateByUrl(`/database/send-mail/${id}`);
  }
}
