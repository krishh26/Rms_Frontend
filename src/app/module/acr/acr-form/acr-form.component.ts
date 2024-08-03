import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';

@Component({
  selector: 'app-acr-form',
  templateUrl: './acr-form.component.html',
  styleUrls: ['./acr-form.component.css']
})
export class AcrFormComponent implements OnInit {
  agencyForm!: FormGroup;
  password = 'password';
  confirmPassword = 'password';
  showPassword = false;
  confirmShowPassword = false;

  constructor(
    private router: Router
  ) {
    this.agencyForm = new FormGroup({
      agencyName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      location: new FormControl('', [Validators.required]),
      noOfBranches: new FormControl('', [Validators.required]),
      keyContactPersonName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      keyContactPersonDesignation: new FormControl('', [Validators.required]),
      keyContactPersonEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      keyContactPersonPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryContactDetails: new FormControl('', []),
      emgSecondaryContactDetails: new FormControl('', []),
      referredBy: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  ngOnInit() {
  }

  // Function to be used for hide show password
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

  // Function to be used for submit details
  submit() {
    console.log('agency details : ' , this.agencyForm.value);
  }
}
