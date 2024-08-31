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
  selector: 'app-cir-all-jobs',
  templateUrl: './cir-all-jobs.component.html',
  styleUrls: ['./cir-all-jobs.component.css']
})
export class CirAllJobsComponent implements OnInit {
  agencyForm!: FormGroup;
  file: any;
  resourcesForm!: FormGroup;
  candidateForm!: FormGroup;
  joblist: any = [];
  jobDetails: any;
  @ViewChild('loginDetailModal') loginDetailModal: any;
  @ViewChild('uploadcvModal') uploadcvModal: any ;

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
    this.getProjectList();
  }

  submit(modalType: string) {
    if(modalType == 'cv'){
      this.modalService.dismissAll()
    }else{
    const loginData = this.localStorageService.getLogger();
    console.log('loginData :', loginData);
      console.log('this.jobDetails :', this.jobDetails);
      let payload = {
        user_id: loginData._id,
        job_id: this.jobDetails.job_id,
        applied: true,
        resources: this.resourcesForm.controls['howmanyresources'].value, // optional 
    }
      this.acrservice.applyJob(payload).subscribe((response) => {
        if (response?.status) {
        this.modalService.open(this.uploadcvModal,{  size : 'xl' })      
        this.getProjectList();
        console.log('response :', response);
        } 
      }, (error) => {
        this.notificationService.showError(error?.message || 'Something went wrong.')
      })
    }
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

  openModal(role: any) {
    this.jobDetails = ''
    this.jobDetails = role
    this.modalService.dismissAll()
    this.modalService.open(this.loginDetailModal,{  size : 'xl' ,backdrop : 'static'})
  }
  closeModal(){
    this.modalService.dismissAll()
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


  getProjectList() {

    this.acrservice.getJobList().subscribe((response) => {
      this.joblist = [];
      if (response?.status == true) {
        this.joblist = response?.data;
        console.log('this.joblist', this.joblist);

      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
  }

}
