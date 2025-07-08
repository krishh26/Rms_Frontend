import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-my-candidate-page',
  templateUrl: './my-candidate-page.component.html',
  styleUrls: ['./my-candidate-page.component.css']
})
export class MyCandidatePageComponent implements OnInit {

  candidatelist: any = [];
  userID!: string;
  userdata: any = [];

  constructor(
    private acrservice: AcrServiceService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCandidateList();
  }


  logout() {
    this.localStorageService.clearStorage();
    this.router.navigate(['/acr/acr-login']);
  }

  getCandidateList() {
    this.userdata = this.localStorageService.getLogger();
    this.userID = this.userdata?._id
    this.acrservice.getCandidateList(this.userID).subscribe((response) => {
      this.candidatelist = [];
      if (response?.status == true) {
        this.candidatelist = response?.data;
        console.log('this.candidatelist', this.candidatelist);

      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
    });
  }

}
