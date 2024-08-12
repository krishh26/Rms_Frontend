import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-data-base-list',
  templateUrl: './show-data-base-list.component.html',
  styleUrls: ['./show-data-base-list.component.css']
})
export class ShowDataBaseListComponent {
  tableData: any[] = [
    {
      tableName: "CIR User",
      type: 'User'
    },
    // {
    //   tableName: "ACR User",
    //   type: 'ACRUser'
    // },
    {
      tableName: "Card",
      type: 'card'
    },
    // {
    //   tableName: "Client",
    //   type: 'client'
    // }
  ]

  constructor(
    private router: Router
  ) { }

  redirectToDetailPage(type: string) {
    this.router.navigateByUrl('/database/details/' + type);
  }
}
