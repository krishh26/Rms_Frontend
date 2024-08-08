import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
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

  file: any;
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  initializeForms() {
    this.otherDetailForm = new FormGroup({

      workLocation: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      expectedDayRate: new FormControl('', [Validators.required]),
      referredBy: new FormControl('', [Validators.required]),
      callDay: new FormControl('', [Validators.required]),
      callTime: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      anyQuestion: new FormControl('', [Validators.required]),
      cv: new FormControl('', [Validators.required]),


      // sponsorForClearanceCertificate: new FormControl('', [Validators.required]),
      // currentJobIs: new FormControl('', [Validators.required]),
      // lookingFor: new FormControl('', [Validators.required]),
      // workingPreference: new FormControl('', [Validators.required]),
      // Availability: new FormControl('', [Validators.required]),

    });
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
        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'File not uploaded.')
    })
  }

  submitotherDetail() {
    this.cirSericeService.updateregister('1', this.otherDetailForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.router.navigate(['/cir/cir-card']);
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message, 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message, 'Select different Username!');
    })
  }


}
