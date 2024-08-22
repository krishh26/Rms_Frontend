import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-all-jobs',
  templateUrl: './cir-all-jobs.component.html',
  styleUrls: ['./cir-all-jobs.component.css']
})
export class CirAllJobsComponent implements OnInit {
  agencyForm!: FormGroup;
  file: any;
  resourcesForm!: FormGroup
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
    private fb: FormBuilder,
  ) {

    this.resourcesForm = this.fb.group({
      candidates: this.fb.array([
        this.createCandidateFormGroup()
      ])
    });

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

  get candidates(): FormArray {
    return this.resourcesForm.get('candidates') as FormArray;
  }

  createCandidateFormGroup(): FormGroup {
    return this.fb.group({
      howmanyresources: ['', Validators.required],
      cv: ['', [Validators.required]],
      nationality: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  addCandidate() {
    this.candidates.push(this.createCandidateFormGroup());
  }

  removeCandidate(index: number) {
    this.candidates.removeAt(index);
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.acrservice.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        console.log(this.file);

        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'File not uploaded.')
    })
  }

}
