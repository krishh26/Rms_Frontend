import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';
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
  cvDetails: any;
  @ViewChild('loginDetailModal') loginDetailModal: any;
  @ViewChild('uploadcvModal') uploadcvModal: any;

  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

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
    const loginData = this.localStorageService.getLogger();

    if (modalType == 'cv') {
      this.modalService.dismissAll();
      let payload = {
        user_id: loginData._id,
        job_id: this.jobDetails.job_id,
        applied: true,
        resources: this.resourcesForm.controls['howmanyresources'].value, // optional,
        cvDetails: this.resourcesForm.value?.candidates?.filter((element: any) => delete element['howmanyresources'])
      }

      this.acrservice.updateApplication(payload).subscribe((response) => {
        if (response?.status) {
          this.getProjectList();
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.message || 'Something went wrong.')
      })

    } else {
      let payload = {
        user_id: loginData._id,
        job_id: this.jobDetails.job_id,
        applied: false,
        resources: this.resourcesForm.controls['howmanyresources'].value, // optional
      }
      this.acrservice.applyJob(payload).subscribe((response) => {
        if (response?.status) {
          this.modalService.open(this.uploadcvModal, { size: 'xl' })
          this.getProjectList();
        }
      }, (error) => {
        console.log('error', error)
        this.notificationService.showError(error?.error?.message || 'Something went wrong.')
      })
    }
  }

  get candidates(): FormArray | any {
    return this.resourcesForm.get('candidates') as FormArray;
  }

  createCandidateFormGroup(): FormGroup {
    return this.fb.group({
      howmanyresources: ['', Validators.required],
      cv: ['', [Validators.required]],
      candidate_nationality: ['', Validators.required],
      candidate_location: ['', Validators.required]
    });
  }

  addCandidate(index: number) {
    if (!this.file) {
      return this.notificationService.showError('Please upload file');
    }

    if (!this.resourcesForm.value?.candidates[index]?.candidate_nationality) {
      return this.notificationService.showError('Please enter candidate nationality');
    }

    if (!this.resourcesForm.value?.candidates[index]?.candidate_location) {
      return this.notificationService.showError('Please enter candidate location');
    }

    this.file = "";

    this.candidates.push(this.createCandidateFormGroup());
  }

  removeCandidate(index: number) {
    this.candidates.removeAt(index);
  }

  openModal(role: any) {
    this.jobDetails = ''
    this.jobDetails = role
    this.modalService.dismissAll()
    this.modalService.open(this.loginDetailModal, { size: 'xl', backdrop: 'static' })
  }

  closeModal() {
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

  fileUpload(event: any, index: number): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.acrservice.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        console.log(this.file);

        // this.resourcesForm.value.candidates[index].cv = this.file;
        this.candidates.at(index).get('cv').setValue(this.file)

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
      this.totalRecords = 0;
      if (response?.status == true) {
        this.joblist = response?.data;
        this.totalRecords = response?.meta_data?.items;
        console.log('this.joblist', this.joblist);

      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
