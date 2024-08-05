import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';

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
  user_id: string = '';
  register_data: any = [];
  file: any;
  selectedImage!: string;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
  ) {
    this.agencyForm = new FormGroup({
      agencyName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      location: new FormControl('', [Validators.required]),
      numberOfBranchesInUK: new FormControl('', [Validators.required]),
      personName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      personDesignation: new FormControl('', [Validators.required]),
      personEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      contactDetails: new FormControl('', []),
      emergencySecondaryContactDetails: new FormControl('', []),
      referredBy: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
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
    this.file = event.target.files[0];
    this.selectedImage = this.file;
  }

  // Function to be used for submit details
  submit() {
    console.log('agency details : ' , this.agencyForm.value);
  }
}
