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
  user_id : string  ='';
  register_data : any =[];

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
      emergencyContact: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.pattern(Patterns.password)]),
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
    this.cirservice.register(this.personalDetailForm.value).subscribe((response) => {
      console.log('response', response);
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

  submitOtherDetails() {
    this.cirservice.updateregister(this.user_id,this.personalDetailForm.value).subscribe((response) => {
      console.log('response', response);
      if (response?.status == true) {
         this.router.navigate(['/cir/cir-card']);
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message , 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message , 'Select different Username!');
    })
  }

  // Function to be used for submit login Details
  submitLoginDetails() {
    this.formType = 'loginDetails';
    this.router.navigate(['/cir/cir-login']);
    console.log('login details : ', this.loginDetailForm.value);
  }

  // previous step
  previousStep(type: string) {
    this.formType = type;
  }
}
