import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
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
      userName: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.pattern(Patterns.password)]),
    });
    this.otherDetailForm = new FormGroup({
      doYouHoldDV: new FormControl('', [Validators.required]),
      clearanceCertificate: new FormControl('', [Validators.required]),
      day: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      dayRate: new FormControl('', [Validators.required]),
      referralBy: new FormControl('', [Validators.required]),
      noticePeriod: new FormControl('', [Validators.required]),
      futureAvailability: new FormControl('', [Validators.required]),
      currentJobType: new FormControl('', [Validators.required]),
      lookingFor: new FormControl('', [Validators.required]),
      workingPreference: new FormControl('', [Validators.required]),
      availability: new FormControl('', [Validators.required]),
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
        // this.localStorageService.setLoginToken(response?.data);
        // this.tokenDecode = response?.data?.token;
        // const decoded = jwtDecode(response?.data?.token);
        // this.loginDetails = decoded;
        // this.localStorageService.setLogger(this.loginDetails);
        // this.router.navigate(['/cir/cir-card']);
        this.formType = 'otherDetails';
        this.notificationService.showSuccess(response?.message, 'Success !');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Something went wrong!');
    })
  }

  // Function to be used for submit personal Details
  // submitPersonalDetail() {
  //   this.formType = 'otherDetails';
  //   console.log('persona details : ', this.personalDetailForm.value);
  // }

  // Function to be used for submit other Details
  submitOtherDetails() {
    this.formType = 'loginDetails';
    console.log('other details : ', this.otherDetailForm.value);
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
