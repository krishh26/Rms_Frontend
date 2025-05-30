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
  selector: 'app-cir-active-roles',
  templateUrl: './cir-active-roles.component.html',
  styleUrls: ['./cir-active-roles.component.css']
})
export class CirActiveRolesComponent implements OnInit {
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
  selectedCV: any = null;
  newCVData:any=null;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  newCV:boolean=false;
  submitRes:boolean=false;
  errorData: boolean = true;
  selectedStatus: string = '';
  loginData: any;
  statusList: string[] = ['QA', "Non-QA" , "All"];
  myControl = new FormControl(); searchText: any;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal,

  ) {
    this.loginData = localStorage.getItem('loginUser');
    this.resourcesForm = this.fb.group({
      howmanyresources: ['', Validators.required],
      candidates: this.fb.array([this.createCandidateFormGroup()])
    });
  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe((res: any) => {
      let storeTest = res;
      this.searchText = res.toLowerCase();
    });
    this.loginData = JSON.parse(localStorage.getItem('loginUser') || '{}');
    this.getProjectList();
  }

  onSelectExistingCV() {
    const storedCV = this.loginData?.cv;
    console.log(storedCV);
    this.newCV=false;
    if (storedCV) {
      this.selectedCV = storedCV;
      console.log(this.selectedCV);
    } else {
      this.selectedCV = null;
      this.notificationService.showError('No CV data found in local storage.');
    }
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
    }
    this.modalService.dismissAll();
    this.modalService.open(this.uploadcvModal, { size: 'xl' })
  }

  newselectedCv()
  {
    this.newCV=true;
    this.selectedCV = null;
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
    this.submitRes=false;
    // Initialize CV object
    let cvData = {
      key: '',
      url: '',
      name: ''
    };

    if (this.selectedCV) {
      cvData = {
        key: this.selectedCV.key,
        url: this.selectedCV.url,
        name: this.selectedCV.name
      };
    }
    if(this.newCV)
    {
      console.log("this called in inner");
      cvData = {
        key: this.newCVData.key,
        url: this.newCVData.url,
        name: this.newCVData.name
      };
    }

    let payload = {
      cv: cvData
    };

    console.log("this is valuye",payload);

    this.acrservice.acrapplyJob(payload, this.jobDetails.job_id).subscribe((response) => {
      if (response?.status) {
        this.getProjectList();
        this.newCV=false;
        this.modalService.dismissAll();
        this.notificationService.showSuccess(response?.message);
      }
    }, (error) => {
      console.log('error', error);
      this.newCV=false;
      this.modalService.dismissAll();
      this.notificationService.showError(error?.error?.message || 'Something went wrong.');
    });
  }

  noApplyjob(job: any) {
    const loginData = this.localStorageService.getLogger();
    let params = {
      user_id: loginData._id,
      job_id: job.job_id,
      "applied": false,
    }
    Swal.fire({
      title: 'You have selected No !',
      text: `Are you sure?`,
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
  openModal(role: any) {
    this.jobDetails = ''
    this.jobDetails = role
    this.modalService.dismissAll()
    this.modalService.open(this.loginDetailModal, { size: 'xl', backdrop: 'static' })
  }

  closeModal() {
    this.modalService.dismissAll()
    this.newCV=false;
    this.selectedCV=null;
    this.submitRes=false;
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  fileUpload(event: any): void {
    this.submitRes=true;
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.acrservice.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.newCVData = response?.data;
        console.log(this.file);
        this.submitRes=false;
        // this.candidates.at(index).get('cv').setValue(this.file)

        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.submitRes=false;
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.submitRes=false;
      this.notificationService.showError(error?.error?.message || 'File not uploaded.')
    })
    

  }


  getProjectList() {
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    this.acrservice.getCirJobList(Payload.projectList).subscribe((response) => {
      this.joblist = [];
      this.totalRecords = 0;
      if (response?.status == true) {
        this.joblist = response?.data;
        this.totalRecords = response?.meta_data?.items;
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
    });
  }

  searchtext() {
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    Payload.projectList.keyword = this.searchText || '';
    Payload.projectList.job_type = this.selectedStatus;
    this.acrservice.getCirJobList(Payload.projectList).subscribe((response) => {
      this.joblist = [];
      this.totalRecords = 0;
      if (response?.status == true) {
        this.joblist = response?.data;
        this.totalRecords = response?.meta_data?.items;
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
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

}
