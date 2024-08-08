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

    if (this.pageType == 'User') {
      this.tableHeader = ['Name', 'Email', 'Phone', 'Emg Phone', 'Education', 'Current Location', 'Job', 'Working Preference']
    } else if (this.pageType == 'ACRUser') {
      this.tableHeader = ['Name', 'PhoneNumber', 'PersonEmail', 'PersonDesignation', 'AgencyName', 'No BranchesInUK', 'Location', 'Created Date']
    } else if (this.pageType == 'card') {
      this.tableHeader = ['Type', 'Role Demand', 'Role Description', 'Value A', 'Value B', 'Value C','Certificate', 'Created At']
    } else if (this.pageType == 'client') {
      this.tableHeader = ['Name', 'Gender', 'UserType', 'Location', 'JobType', 'Rate']
    }
    // Here is call get details API for table
    const payload = {
      modelName : this.pageType
    }
    this.databaseService.getModelData(payload).subscribe((response) => {
      if (response?.status) {
        console.log('response', response);
        this.tableData = response.data;
      } else {
        this.notificationService.showError(response?.message || 'Resume not uploaded.')
      }
    })
  }
}
