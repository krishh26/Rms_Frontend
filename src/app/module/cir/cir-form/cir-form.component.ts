import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit() {
  }

  initializeForms() {
    this.personalDetailForm = new FormGroup({
      candidateName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      contactEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      secondaryEmail: new FormControl('', [Validators.pattern(Patterns.email)]),
      contactPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryPhoneNumber: new FormControl('', [Validators.pattern(Patterns.mobile)]),
      dob: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      profilePhoto: new FormControl('', [Validators.required]),
      candidateCurrentLocation: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      ukDrivingLicense: new FormControl('', [Validators.required]),
      emgContactDetail: new FormControl('', [Validators.required])
    });
    this.otherDetailForm = new FormGroup({
      // candidateName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      // contactEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      // secondaryEmail: new FormControl('', [Validators.pattern(Patterns.email)]),
      // contactPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      // secondaryPhoneNumber: new FormControl('', [Validators.pattern(Patterns.mobile)]),
      // dob: new FormControl('', [Validators.required]),
      // education: new FormControl('', [Validators.required]),
      // profilePhoto: new FormControl('', [Validators.required]),
      // candidateCurrentLocation: new FormControl('', [Validators.required]),
      // nationality: new FormControl('', [Validators.required]),
      // ukDrivingLicense: new FormControl('', [Validators.required]),
      // emgContactDetail: new FormControl('', [Validators.required])
    });
    this.loginDetailForm = new FormGroup({
      // candidateName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      // contactEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      // secondaryEmail: new FormControl('', [Validators.pattern(Patterns.email)]),
      // contactPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      // secondaryPhoneNumber: new FormControl('', [Validators.pattern(Patterns.mobile)]),
      // dob: new FormControl('', [Validators.required]),
      // education: new FormControl('', [Validators.required]),
      // profilePhoto: new FormControl('', [Validators.required]),
      // candidateCurrentLocation: new FormControl('', [Validators.required]),
      // nationality: new FormControl('', [Validators.required]),
      // ukDrivingLicense: new FormControl('', [Validators.required]),
      // emgContactDetail: new FormControl('', [Validators.required])
    })
  }

  // Function to be used for submit personal Details
  submitPersonalDetail() {
    this.formType = 'otherDetails';
    console.log('persona details : ', this.personalDetailForm.value);
  }

  // Function to be used for submit other Details
  submitOtherDetails() {
    this.formType = 'loginDetails';
    console.log('persona details : ', this.otherDetailForm.value);
  }

  // Function to be used for submit login Details
  submitLoginDetails() {
    this.formType = 'loginDetails';
    this.router.navigate(['/cir/cir-login']);
    console.log('persona details : ', this.otherDetailForm.value);
  }

  previousStep(type : string) {
    this.formType = type;
  }
}
