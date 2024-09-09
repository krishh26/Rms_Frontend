import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';
import { Payload } from 'src/app/shared/constant/payload.const';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
  public timerSubscription: Subscription = new Subscription()

  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

  errorData : boolean = true;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal,

  ) {

    this.resourcesForm = this.fb.group({
      howmanyresources: ['', Validators.required],
      candidates: this.fb.array([this.createCandidateFormGroup()])
    });
  }

  ngOnInit() {
    this.startTimers();
    this.getProjectList();
  }

  onChangeInput() {
    this.resourcesForm.value?.candidates?.map((element: any) => {
      if (!element?.cv || !element?.candidate_location || !element?.candidate_nationality) {
        this.errorData = true;
      } else {
        this.errorData = false;
      }
    });
  }

  removeAll() {
    (this.resourcesForm.controls['candidates'] as FormArray).clear();
  }

  openCVModal(job: any) {
    this.jobDetails = job;
    this.removeAll();
    for (let i = 0; i < Number(job?.no_of_resouces); i++) {
      this.addCandidate(i)
    }
    this.modalService.dismissAll();
    this.modalService.open(this.uploadcvModal, { size: 'xl' })
  }

  submitCV() {
    const loginData = this.localStorageService.getLogger();
    let payload = {
      user_id: loginData._id,
      job_id: this.jobDetails.job_id,
      applied: true,
      resources: this.resourcesForm.controls['howmanyresources'].value, // optional,
      cvDetails: this.resourcesForm.value?.candidates?.filter((element: any) => delete element['howmanyresources'])
    }
    let errorCounter: number = 0;

    payload?.cvDetails?.map((element: any) => {
      if (!element?.cv || !element?.candidate_location || !element?.candidate_nationality) {
        errorCounter++;
      }
    });

    if (errorCounter > 0) {
      return this.notificationService.showError('Please fill details');
    }

    this.acrservice.updateApplication(payload).subscribe((response) => {
      if (response?.status) {
        this.getProjectList();
        this.modalService.dismissAll();
      }
    }, (error) => {
      this.modalService.dismissAll();
      this.notificationService.showError(error?.error?.message || 'Something went wrong.')
    })

  }

  submitResources() {
    const loginData = this.localStorageService.getLogger();
    let payload = {
      user_id: loginData._id,
      job_id: this.jobDetails.job_id,
      applied: true,
      resources: this.resourcesForm.controls['howmanyresources'].value, // optional
    }
    this.acrservice.applyJob(payload).subscribe((response) => {
      if (response?.status) {
        this.getProjectList();
        this.modalService.dismissAll();
      }
    }, (error) => {
      console.log('error', error)
      this.modalService.dismissAll();
      this.notificationService.showError(error?.error?.message || 'Something went wrong.')
    })
  }

  noApplyjob(job: any) {
    const loginData = this.localStorageService.getLogger();
    let params = {
      user_id: loginData._id,
      job_id: job.job_id,
      "applied": false,
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to Action `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes !'
    }).then((result) => {
      if (result.value) {
        this.acrservice.applyJob(params).subscribe((res: any) => {
          this.notificationService.showSuccess('', 'Notification successfully deleted');
          window.location.reload();
        });
      }
    });
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
    // if (!this.file) {
    //   return this.notificationService.showError('Please upload file');
    // }

    // if (!this.resourcesForm.value?.candidates[index]?.candidate_nationality) {
    //   return this.notificationService.showError('Please enter candidate nationality');
    // }

    // if (!this.resourcesForm.value?.candidates[index]?.candidate_location) {
    //   return this.notificationService.showError('Please enter candidate location');
    // }

    // this.file = "";

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
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    this.acrservice.getJobList(Payload.projectList).subscribe((response) => {
      this.joblist = [];
      this.totalRecords = 0;
      if (response?.status == true) {
        this.joblist = response?.data;
        this.totalRecords = response?.meta_data?.items;
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

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimers() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.joblist.forEach((job: any) => {
        if (job.job_time_left > 0) {
          job.job_time_left -= 1000;
        }
      });
    });
  }

  formatTimeLeft(milliseconds: number): string {
    if (milliseconds <= 0) {
      return '00:00:00';
    }

    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    let daysDisplay = days > 0 ? days + 'd ' : '';
    let hoursDisplay = hours > 0 ? hours + 'h ' : '';
    let minutesDisplay = minutes > 0 ? minutes + 'm ' : '';
    let secondsDisplay = seconds + 's';

    return daysDisplay + hoursDisplay + minutesDisplay + secondsDisplay;
  }

}
