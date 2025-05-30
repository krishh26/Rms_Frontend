import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';

@Component({
  selector: 'app-acr-add-candidate',
  templateUrl: './acr-add-candidate.component.html',
  styleUrls: ['./acr-add-candidate.component.css']
})
export class AcrAddCandidateComponent implements OnInit {
  jobForm!: FormGroup;
  agencylist: any = [];
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
  ) {
    this.jobForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      joiningDate: new FormControl('', [Validators.required]),
      status: new FormControl(moment(new Date()).format('dd-MM-YYYY'), [Validators.required]),
      agencyId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getAgencyList();
  }

  submit() {
    this.acrservice.createCandidate(this.jobForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.notificationService.showSuccess(response?.message, 'Success !');
        this.jobForm.reset();
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
    })
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getAgencyList() {
    this.acrservice.getAgencyList().subscribe((response) => {
      this.agencylist = [];
      if (response?.status == true) {
        this.agencylist = response?.data || [];
        console.log('this.agencylist', this.agencylist);

      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
    });
  }

}
