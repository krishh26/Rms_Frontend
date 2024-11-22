import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-applicants-details',
  templateUrl: './applied-applicants-details.component.html',
  styleUrls: ['./applied-applicants-details.component.css']
})
export class AppliedApplicantsDetailsComponent {
  
  tableData: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    const details = localStorage.getItem('applicantsData');
    if (details) {
      const parsedData = JSON.parse(details);
      this.tableData = parsedData?.applicants || []; // Extract all applicants
      console.log('Mapped Table Data:', this.tableData);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('applicantsData');
  }

  openDocument(documentUrl: string) {
    if (documentUrl) {
      window.open(documentUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Document URL is missing!');
    }
  }
}  