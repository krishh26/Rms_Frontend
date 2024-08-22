import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
@Component({
  selector: 'app-acr-admin',
  templateUrl: './acr-admin.component.html',
  styleUrls: ['./acr-admin.component.css']
})
export class AcrAdminComponent implements OnInit {
  agencyForm!: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
  ) {
    this.agencyForm = new FormGroup({
      jobtitle: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      Noofroles: new FormControl('', [Validators.required]),
      positionstartdate: new FormControl('', [Validators.required]),
      publishdate: new FormControl(moment(new Date()).format('dd-MM-YYYY'), [Validators.required, Validators.pattern(Patterns.name)]),
      clientname: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      dayrate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  submit() {

  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

}
