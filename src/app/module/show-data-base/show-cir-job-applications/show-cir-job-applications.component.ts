import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-cir-job-applications',
  templateUrl: './show-cir-job-applications.component.html',
  styleUrls: ['./show-cir-job-applications.component.css']
})
export class ShowCirJobApplicationsComponent implements OnInit {
  showFilter: boolean = false;
  jobId!: string;
  tableHeader: string[] = [
    "Sr No.",
    "Job ID",
    "Job Title",
    "Candidate Name",
    "Phone Number",
    "Email",
    "Current Work Type",
    // "Nationality",
    "Expected DayRate",
    // "Looking For",
    "Work Preference",
    "CV",
    "Applied Date"
  ];
  tableData: any[] = [];
  exportData: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id') as string;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.tableData = [];
    this.databaseService.getCIRJobApplicant(this.jobId).subscribe((response) => {
      if (response?.status) {
        this.tableData = response?.data || [];
        this.tableData?.map((item, index) => {
          this.exportData.push({
            srNo: index + 1,
            job_id: item?.job_id,
            job_title: item?.jobDetails?.job_title,
            candidate_name: item?.user?.name,
            phone_number: item?.user?.countrycode + ' ' + item?.user?.phoneNumber,
            email: item?.user?.email,
            currentWork: item?.user?.currentWork,
            expectedDayRate: item?.user?.expectedDayRate,
            workPreference: item?.workPreference?.join(', '),
            cv: item?.cvDetails?.url,
            applied_date: item?.createdAt
          })
        })
      }
    })
  }

  downloadAsExcel() {
    this.databaseService.ExportToExcel(this.exportData, "cir_job_applicant");
  }

  openDocument(document: any) {
    window.open(document?.url, '_blank', 'noopener, noreferrer');
  }
}
