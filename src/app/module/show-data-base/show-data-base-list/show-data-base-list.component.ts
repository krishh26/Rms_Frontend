import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-data-base-list',
  templateUrl: './show-data-base-list.component.html',
  styleUrls: ['./show-data-base-list.component.css']
})
export class ShowDataBaseListComponent {
    tableData : any[] = [
      {
        tableName : "User",
        type : 'USER'
      },
      {
        tableName : "CIR List",
        type : 'ACR_LIST' // 'CIR_LIST'
      },
      {
        tableName : "ACR List",
        type : 'ACR_LIST'
      },
      {
        tableName : "CIR Document",
        type : 'ACR_LIST'
      },
      {
        tableName : "ACR Document",
        type : 'ACR_LIST' // 'ACR_DOCUMENT'
      }
    ]

    constructor(
      private router : Router
    ) {}

    redirectToDetailPage(type : string) {
      this.router.navigateByUrl('/database/details/' + type);
    }
}
