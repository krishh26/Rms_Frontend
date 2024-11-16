import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-roles-details',
  templateUrl: './user-roles-details.component.html',
  styleUrls: ['./user-roles-details.component.css']
})
export class UserRolesDetailsComponent implements OnInit {
  tableData!: any[];

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    const details = localStorage.getItem('roleDetailData');
    console.log(details);
    if(details) {
      const data = JSON.parse(details);
      this.tableData = data?.appliedRole || [];
      console.log(this.tableData);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('roleDetailData');
  }


  openDocument(document: any) {
    window.open(document?.url, '_blank', 'noopener, noreferrer');
  }
}
