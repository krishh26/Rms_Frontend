import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
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
    if (this.pageType == 'USER') {
      this.tableHeader = ['Name', 'Location', 'Dob', 'Gender']
      this.tableData = [
        {
          Name: 'Payal',
          Location: 'Mumbai',
          Dob: '1990-01-01',
          Gender: 'Female'
        },
        {
          Name: 'Khushi',
          Location: 'Mumbai',
          Dob: '1990-01-01',
          Gender: 'Female'
        },
        {
          Name: 'Ranvir',
          Location: 'Mumbai',
          Dob: '1990-01-01',
          Gender: 'Male'
        }
      ]
    }

    if (this.pageType == 'ACR_LIST') {
      this.tableHeader = ['Name', 'Gender', 'UserType', 'Location', 'JobType', 'Rate']
      this.tableData = [
        {
          Name: 'Payal',
          Gender: 'Female',
          UserType: 'ACR',
          Location: 'Mumbai',
          JobType: 'Permanent',
          Rate: '$10 / h',
        },
        {
          Name: 'Khushi',
          Gender: 'Female',
          UserType: 'ACR',
          Location: 'Mumbai',
          JobType: 'Permanent',
          Rate: '$15 / h',
        },
        {
          Name: 'Ranjit',
          Gender: 'Male',
          UserType: 'ACR',
          Location: 'Mumbai',
          JobType: 'Part Time',
          Rate: '$13 / h',
        },
      ]
    }
    // Here is call get details API for table
  }
}
