import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-cir-otherdetails-form',
  templateUrl: './cir-otherdetails-form.component.html',
  styleUrls: ['./cir-otherdetails-form.component.css']
})
export class CirOtherdetailsFormComponent implements OnInit {
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  otherDetailForm!: FormGroup;
  userID!: string;
  userdata: any = [];

  file: any;
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,

  ) {
    this.initializeForms();

    this.userdata = this.localStorageService.getLogger();
    this.userID = this.userdata?.user?._id
    console.log(this.userID);
  }

  ngOnInit() {
  }

  initializeForms() {
    this.otherDetailForm = new FormGroup({

      workLocation: new FormControl([], [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      expectedDayRate: new FormControl('', [Validators.required]),
      referredBy: new FormControl('', [Validators.required]),
      callDay: new FormControl('', [Validators.required]),
      callTime: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      anyQuestion: new FormControl('', [Validators.required]),
      cv: new FormControl('', [Validators.required]),
    });
  }

  selectedRoles: string[] = [];

  onCheckboxChange(event: any) {
    const workLocation: string[] = this.otherDetailForm.get('workLocation')?.value || [];

    if (event.target.checked) {
      workLocation.push(event.target.value);
    } else {
      const index = workLocation.indexOf(event.target.value);
      if (index > -1) {
        workLocation.splice(index, 1);
      }
    }

    this.otherDetailForm.patchValue({ workLocation: workLocation });
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public showHidePass(type: string): void {
    if (type == 'password' && this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }

    if (type !== 'password' && this.confirmPassword === 'password') {
      this.confirmPassword = 'text';
      this.confirmShowPassword = true;
    } else {
      this.confirmPassword = 'password';
      this.confirmShowPassword = false;
    }
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.cirSericeService.fileUpload(data).subscribe((response) => {
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

  submitotherDetail() {
    if (!this.file) {
      return this.notificationService.showError('Please upload file');
    }
    this.otherDetailForm.controls['cv'].patchValue(this.file);
    console.log(this.userID);
    this.cirSericeService.updateregister(this.userID, this.otherDetailForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message, 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message, 'Select different Username!');
    })
  }


}
