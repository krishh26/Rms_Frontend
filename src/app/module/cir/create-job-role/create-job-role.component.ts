import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/shared/constant/pagination.constant';
import { Payload } from 'src/app/shared/constant/payload.const';

@Component({
  selector: 'app-create-job-role',
  templateUrl: './create-job-role.component.html',
  styleUrls: ['./create-job-role.component.css']
})
export class CreateJobRoleComponent {
  nameForm: FormGroup;
  id?: string;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  jobRoleList: any = [];
  jobRoleid: string = '';

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Initialize the form group
    this.nameForm = this.fb.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getJobFutureRoleList();
  }

  onSubmit() {
    if (this.nameForm.valid) {
      this.cirservice.createJobRole(this.nameForm.value, this.id ?? '').subscribe((response) => {
        if (response) {
          this.notificationService.showSuccess('', 'Job role successfully added');
          window.location.reload();
        }
      }, (error) => {
        this.notificationService.showError(error?.message || 'Please Enter Valid Value.')
      });
    } else {
      this.notificationService.showError('Please Enter Value')
    }
  }

  paginate(page: number) {
    this.page = page;
     this.getJobFutureRoleList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getJobFutureRoleList() {
    Payload.jobROleList.page = String(this.page);
    Payload.jobROleList.limit = String(this.pagesize);
    this.cirservice.getJobRoleList(Payload.jobROleList, this.id).subscribe((response) => {
      this.jobRoleList = [];
      this.totalRecords = 0;
      if (response?.status == true) {
        this.jobRoleList = response?.data?.roles;
        console.log(this.jobRoleList);
        
        this.totalRecords = response?.meta_data?.items;
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
    });
  }


}

