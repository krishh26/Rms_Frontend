import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';

@Component({
  selector: 'app-send-acr-job-mail',
  templateUrl: './send-acr-job-mail.component.html',
  styleUrls: ['./send-acr-job-mail.component.css']
})
export class SendAcrJobMailComponent {

  tableData: any[] = [];
  jobId: any;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.databaseService.getACRUserWithJobApplication(this.jobId).subscribe((response) => {
      if (response?.status) {
        this.tableData = response?.data || []; // Extract all applicants
        this.totalRecords = response?.meta_data?.items;
      }
    })
  }

  openDocument(documentUrl: string) {
    if (documentUrl) {
      window.open(documentUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Document URL is missing!');
    }
  }

  paginate(page: number) {
    this.page = page;
    this.getTableData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submit() {
    const payload = {
      jobId: this.jobId,
      emails: ['test@gmail.com'],
    }

    this.databaseService.sendAcrJobPostMail(payload).subscribe((response) => {
      if (response?.status) {
           this.notificationService.showSuccess('Successfully send mail.');
      } else {
        this.notificationService.showError('Mail sending fail please retry !')
      }
    }, (error) => {
      this.notificationService.showError('Mail sending fail please retry !')
    })
  }
}
