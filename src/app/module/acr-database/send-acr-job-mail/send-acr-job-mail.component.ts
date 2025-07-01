import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  selectedEmails: string[] = [];
  mailType: string = 'new';
  selectedDate: string = '';
  @ViewChild('confirmModal') confirmModal: any;

  get isAllSelected(): boolean {
    return this.tableData.length > 0 && this.selectedEmails.length === this.tableData.filter(a => a?.personEmail).length;
  }

  isSelected(email: string): boolean {
    return this.selectedEmails.includes(email);
  }

  toggleSelection(email: string, event: any) {
    if (event.target.checked) {
      if (!this.selectedEmails.includes(email)) {
        this.selectedEmails.push(email);
      }
    } else {
      this.selectedEmails = this.selectedEmails.filter(e => e !== email);
    }
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedEmails = this.tableData.filter(a => a?.personEmail).map(a => a.personEmail);
    } else {
      this.selectedEmails = [];
    }
  }

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: NgbModal
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
        // Deselect all on new data
        this.selectedEmails = [];
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

  openConfirmModal() {
    this.mailType = 'new';
    this.selectedDate = '';
    this.modalService.open(this.confirmModal, { centered: true });
  }

  confirmSubmit(modal: any) {
    modal.close();
    this.submit();
  }

  submit() {
    const payload = {
      jobId: this.jobId,
      emails: this.selectedEmails,
      mailType: this.mailType,
      date: this.selectedDate
    };

    this.databaseService.sendAcrJobPostMail(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess('Successfully sent mail.');
      } else {
        this.notificationService.showError('Mail sending failed, please retry!');
      }
    }, (error) => {
      this.notificationService.showError('Mail sending failed, please retry!');
    });
  }
}
