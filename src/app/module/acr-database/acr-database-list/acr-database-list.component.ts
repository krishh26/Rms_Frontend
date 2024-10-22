import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acr-database-list',
  templateUrl: './acr-database-list.component.html',
  styleUrls: ['./acr-database-list.component.css']
})
export class AcrDatabaseListComponent implements OnInit {
  tableData: any[] = [
    {
      tableName: "ACR User",
      type: 'User'
    },
    // {
    //   tableName: "ACR User",
    //   type: 'ACRUser'
    // },
    {
      tableName: "ACR Job",
      type: 'Job'
    },
    // {
    //   tableName: "Client",
    //   type: 'client'
    // }
  ]

  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  redirectToDetailPage(type: string) {
    const route = `/acr-database/acr-details/details/${type}`;
  
  // Use the router to navigate to the constructed route
  this.router.navigate([route]);
  }
}
