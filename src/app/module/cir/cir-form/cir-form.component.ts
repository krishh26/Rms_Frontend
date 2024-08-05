import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cir-form',
  templateUrl: './cir-form.component.html',
  styleUrls: ['./cir-form.component.css']
})
export class CirFormComponent implements OnInit {
  formType: string = 'personalDetails' // 'personalDetails', 'otherDetails', 'loginDetails'
  personalDetailForm!: FormGroup;
  otherDetailForm!: FormGroup;
  loginDetailForm!: FormGroup;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  user_id: string = '';
  register_data: any = [];
  file: any;
  selectedImage!: string;
  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.initializeForms();
  }

  ngOnInit() {
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  initializeForms() {
    this.personalDetailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      secondaryEmail: new FormControl('', [Validators.pattern(Patterns.email)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryPhoneNumber: new FormControl('', [Validators.pattern(Patterns.mobile)]),
      dataOfBirth: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      profilePhoto: new FormControl('', [Validators.required]),
      currentLocation: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      UKDrivinglicense: new FormControl('', [Validators.required]),
      emergencyContact: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.pattern(Patterns.password)]),
      emergencyName: new FormControl('', [Validators.required]),
      emergencyEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      courseName: new FormControl('', [Validators.required]),
      qualificationAndCertification: new FormControl('', [Validators.required]),
    });
    this.otherDetailForm = new FormGroup({
      anySC_DV: new FormControl('', [Validators.required]),
      sponsorForClearanceCertificate: new FormControl('', [Validators.required]),
      callDay: new FormControl('', [Validators.required]),
      callTime: new FormControl('', [Validators.required]),
      expectedDayRate: new FormControl('', [Validators.required]),
      referredBy: new FormControl('', [Validators.required]),
      noticePeriod: new FormControl('', [Validators.required]),
      futureAvailability: new FormControl('', [Validators.required]),
      currentJobIs: new FormControl('', [Validators.required]),
      lookingFor: new FormControl('', [Validators.required]),
      workingPreference: new FormControl('', [Validators.required]),
      Availability: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });
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


  submitPersonalDetail() {
    const data = new FormData();
    data.append('name', this.personalDetailForm.controls['name'].value || '');
    data.append('email', this.personalDetailForm.controls['email'].value || '');
    data.append('secondaryEmail', this.personalDetailForm.controls['secondaryEmail'].value || '');
    data.append('phoneNumber', this.personalDetailForm.controls['phoneNumber'].value || '');
    data.append('secondaryPhoneNumber', this.personalDetailForm.controls['secondaryPhoneNumber'].value || '');
    data.append('dataOfBirth', this.personalDetailForm.controls['dataOfBirth'].value || '');
    data.append('education', this.personalDetailForm.controls['education'].value || '');
    data.append('currentLocation', this.personalDetailForm.controls['currentLocation'].value || '');
    data.append('nationality', this.personalDetailForm.controls['nationality'].value || '');
    data.append('UKDrivinglicense', this.personalDetailForm.controls['UKDrivinglicense'].value || '');
    data.append('emergencyContact', this.personalDetailForm.controls['emergencyContact'].value || '');
    data.append('userName', this.personalDetailForm.controls['userName'].value || '');
    data.append('password', this.personalDetailForm.controls['password'].value || '');
    data.append('confirmPassword', this.personalDetailForm.controls['confirmPassword'].value || '');
    data.append('emergencyName', this.personalDetailForm.controls['emergencyName'].value || '');
    data.append('emergencyEmail', this.personalDetailForm.controls['emergencyEmail'].value || '');
    data.append('courseName', this.personalDetailForm.controls['courseName'].value || '');
    data.append('qualificationAndCertification', this.personalDetailForm.controls['qualificationAndCertification'].value || '');
    data.append('profilePicture', this.file || '');

    this.cirservice.register(data).subscribe((response) => {
      if (response?.status == true) {
        this.formType = 'otherDetails';
        // this.localStorageService.setLogger(response?.data);
        this.user_id = response?.data?.user?._id;
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Something went wrong!');
    })
  }

  fileUpload(event: any): void {
    this.file = event.target.files[0];
    this.selectedImage = this.file;
  }

  submitOtherDetails() {
    this.cirservice.updateregister(this.user_id, this.otherDetailForm.value).subscribe((response) => {
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

  // Function to be used for submit login Details
  submitLoginDetails() {
    this.formType = 'loginDetails';
    this.router.navigate(['/cir/cir-login']);
  }

  // previous step
  previousStep(type: string) {
    this.formType = type;
  }
}
