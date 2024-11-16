import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';

@Component({
  selector: 'app-create-job-role',
  templateUrl: './create-job-role.component.html',
  styleUrls: ['./create-job-role.component.css']
})
export class CreateJobRoleComponent {
  nameForm: FormGroup;
  id?: string;

  constructor(private fb: FormBuilder,private toast: ToastrService,private route: ActivatedRoute,private cirservice: CirSericeService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Initialize the form group
    this.nameForm = this.fb.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.nameForm.valid) {
      this.cirservice.createJobRole(this.nameForm.value,this.id ??'').subscribe((response) => {
        if (response)
        {
          this
        }
      }, (error) => {
        console.log('error',error);
      });
    } else {
      this.toast.error('please enter proper value');
    }
  }
}

