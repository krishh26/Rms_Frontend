import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-future-card-details',
  templateUrl: './future-card-details.component.html',
  styleUrls: ['./future-card-details.component.css']
})
export class FutureCardDetailsComponent implements OnInit {
  tableData: any;
  cardId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cirservice: CirSericeService,
    private notificationService: NotificationService
  ) {
    this.cardId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getCardDetails();
  }

  getCardDetails() {
    const payload = {
      page: 1,
      limit: 10000,
    }

    this.cirservice.getJobRoleList(payload, this.cardId).subscribe((response) => {
      this.tableData = [];
      // this.totalRecords = 0;
      if (response?.status == true) {
        this.tableData = response?.data;
        // this.totalRecords = response?.meta_data?.items;
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
    });
  }
}
