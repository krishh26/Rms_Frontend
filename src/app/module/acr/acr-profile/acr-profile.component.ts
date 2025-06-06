import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-acr-profile',
  templateUrl: './acr-profile.component.html',
  styleUrls: ['./acr-profile.component.css']
})
export class AcrProfileComponent implements OnInit {

  agencyForm!: FormGroup;
  loginDetails!: any;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  showPasswordFields = false;
  file: any;
  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private acrSericeService: AcrServiceService
  ) {
    const loginData = this.localStorageService.getLogger();
    if (loginData) {
      this.loginDetails = loginData;
      this.initializeForms();
    }
  }

  ngOnInit() {
    // console.log(this.loginDetails.profile.url);
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.acrSericeService.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        console.log(this.file);

        this.notificationService.showSuccess(response?.message || 'Profile picture successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'File not uploaded.')
    })
  }

  initializeForms() {
    console.log(this.loginDetails);

    this.agencyForm = new FormGroup({
      profile: new FormControl(this.loginDetails.profile.url, [Validators.required]),
      agencyName: new FormControl(this.loginDetails.agencyName),
      location: new FormControl(this.loginDetails.location, [Validators.required]),
      numberOfBranchesInUK: new FormControl(this.loginDetails.numberOfBranchesInUK, [Validators.required]),
      personName: new FormControl(this.loginDetails.personName, [Validators.required, Validators.pattern(Patterns.name)]),
      personDesignation: new FormControl(this.loginDetails.personDesignation, [Validators.required]),
      personEmail: new FormControl(this.loginDetails.personEmail, [Validators.required, Validators.pattern(Patterns.email)]),
      phoneNumberCountryCode: new FormControl(this.loginDetails.phoneNumberCountryCode, [Validators.required]),
      phoneNumber: new FormControl(this.loginDetails.phoneNumber, [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryContectName: new FormControl(this.loginDetails.secondaryContectName),
      secondaryDesignation: new FormControl(this.loginDetails.secondaryDesignation),
      secondaryEmail: new FormControl(this.loginDetails.secondaryEmail, [Validators.required]),
      secondaryPhoneNumber: new FormControl(this.loginDetails.secondaryPhoneNumber, [Validators.required]),
      secondaryPhoneNumberCountryCode: new FormControl(this.loginDetails.secondaryPhoneNumberCountryCode, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public showHidePass(type: string): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
    } else if (type === 'confirmPassword') {
      this.confirmShowPassword = !this.confirmShowPassword;
    }
  }

  submit() {
    if (this.agencyForm.controls['password']?.value || this.agencyForm.controls['confirmPassword']?.value) {
      if (this.agencyForm.controls['password']?.value !== this.agencyForm.controls['confirmPassword']?.value) {
        return this.notificationService.showError('Password and confirm password not matched');
      }
    }

    const data: any = {
      profile: this.agencyForm.controls['profile']?.value,
      agencyName: this.agencyForm.controls['agencyName']?.value,
      location: this.agencyForm.controls['location']?.value,
      numberOfBranchesInUK: this.agencyForm.controls['numberOfBranchesInUK']?.value,
      personName: this.agencyForm.controls['personName']?.value,
      personDesignation: this.agencyForm.controls['personDesignation']?.value,
      personEmail: this.agencyForm.controls['personEmail']?.value,
      phoneNumberCountryCode: this.agencyForm.controls['phoneNumberCountryCode']?.value,
      phoneNumber: this.agencyForm.controls['phoneNumber']?.value,
      secondaryContectName: this.agencyForm.controls['secondaryContectName']?.value,
      secondaryDesignation: this.agencyForm.controls['secondaryDesignation']?.value,
      secondaryEmail: this.agencyForm.controls['secondaryEmail']?.value,
      secondaryPhoneNumber: this.agencyForm.controls['secondaryPhoneNumber']?.value,
      secondaryPhoneNumberCountryCode: this.agencyForm.controls['secondaryPhoneNumberCountryCode']?.value
    };

    if (this.agencyForm.controls['password']?.value) {
      data['password'] = this.agencyForm.controls['password']?.value;
    }

    this.acrSericeService.updateregister('', data).subscribe((response) => {
      if (response?.status) {
        console.log('response', response);
        this.notificationService.showSuccess(response?.message || 'Details Updated successfully');
      } else {
        this.notificationService.showError(response?.message || 'Details Not Updated.');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Details Not Updated.');
    });
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
  }

  updatePassword() {
    if (!this.agencyForm.controls['password']?.value || !this.agencyForm.controls['confirmPassword']?.value) {
      return this.notificationService.showError('Please enter both password and confirm password');
    }

    if (this.agencyForm.controls['password']?.value !== this.agencyForm.controls['confirmPassword']?.value) {
      return this.notificationService.showError('Password and confirm password do not match');
    }

    const passwordData = {
      password: this.agencyForm.controls['password']?.value
    };

    const token = this.localStorageService.getLoggerToken();

    this.acrSericeService.resetpassword(passwordData, token).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message || 'Password updated successfully');
        // Clear password fields
        this.agencyForm.controls['password']?.setValue('');
        this.agencyForm.controls['confirmPassword']?.setValue('');
        this.showPasswordFields = false;
      } else {
        this.notificationService.showError(response?.message || 'Password not updated');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Password not updated');
    });
  }

}
