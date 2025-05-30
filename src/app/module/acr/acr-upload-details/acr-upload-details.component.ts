import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-acr-upload-details',
  templateUrl: './acr-upload-details.component.html',
  styleUrls: ['./acr-upload-details.component.css']
})
export class AcrUploadDetailsComponent implements OnInit {
  agencyForm!: FormGroup;
  file: any;
  resourcesForm: FormGroup;
  candidateForm!: FormGroup
  @ViewChild('content', { static: true }) content: TemplateRef<any> | undefined;

  candidate = [
    { name: 'Software Engineer', noofroles: '3', startdate: '01-09-2024 ', publisheddate: '15-08-2024', clientname: 'ABC Tech', location: 'London, UK', dayrate: '£450/day', timer: '1:58:45', status: 'Actioned', },
    { name: 'Data Analyst', noofroles: '2', startdate: ' 10-09-2024', publisheddate: ' 17-08-2024', clientname: 'XYZ Corp', location: 'Manchester, UK', dayrate: '£400/day', timer: '12:58:45', status: 'Actioned', },
    { name: 'Project Manager', noofroles: '1', startdate: '25-08-2024 ', publisheddate: ' 18-08-2024', clientname: 'DEF Solutions', location: 'Birmingham, UK', dayrate: '£500/day', timer: 'N/A', status: 'Active', },
    { name: 'QA Tester', noofroles: '4', startdate: '05-09-2024 ', publisheddate: '19-08-2024 ', clientname: 'GHI Innovations', location: 'Bristol, UK', dayrate: '£350/day', timer: '23:00:00', status: 'Inactive', },
    { name: 'DevOps Engineer', noofroles: '2', startdate: '15-09-2024 ', publisheddate: '20-08-2024 ', clientname: 'JKL Enterprises', location: 'Leeds, UK', dayrate: '£350/day', timer: '05:12:39', status: 'Not Submitted', },
    { name: 'Project Manager', noofroles: '1', startdate: ' 25-08-2024', publisheddate: ' 18-08-2024', clientname: 'DEF Solutions', location: 'Birmingham, UK', dayrate: '£500/day', timer: '17:52:07', status: 'Submitted', },
    { name: 'DevOps Engineer', noofroles: '4', startdate: '05-09-2024 ', publisheddate: '19-08-2024 ', clientname: 'GHI Innovations', location: 'Bristol, UK', dayrate: '£350/day', timer: '00:54:00', status: 'Expired', },
    { name: 'QA Tester', noofroles: '2', startdate: '15-09-2024 ', publisheddate: '20-08-2024 ', clientname: 'JKL Enterprises', location: 'Leeds, UK', dayrate: '£550/day', timer: '1:23:37', status: 'Inactive', },
  ];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {

    this.resourcesForm = this.fb.group({
      howmanyresources: ['', Validators.required],
      candidates: this.fb.array([this.createCandidateFormGroup()])
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


  removeCandidate() {
   // this.candidates.removeAt(index);
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
      this.notificationService.showError(error?.error?.message || 'File not uploaded.')
    })
  }

}
