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
    console.log(this.loginDetails.agencyName);
  }

  initializeForms() {
    console.log(this.loginDetails);
    
    this.agencyForm = new FormGroup({
      agencyName: new FormControl(this.loginDetails.agencyName, [Validators.required, Validators.pattern(Patterns.name)]),
      location: new FormControl(this.loginDetails.location, [Validators.required]),
      numberOfBranchesInUK: new FormControl(this.loginDetails.numberOfBranchesInUK, [Validators.required]),
      personName: new FormControl(this.loginDetails.personName, [Validators.required, Validators.pattern(Patterns.name)]),
      personDesignation: new FormControl(this.loginDetails.personDesignation, [Validators.required]),
      personEmail: new FormControl(this.loginDetails.personEmail, [Validators.required, Validators.pattern(Patterns.email)]),
      phoneNumber: new FormControl(this.loginDetails.phoneNumber, [Validators.required, Validators.pattern(Patterns.mobile)]),
      contactDetails: new FormControl(this.loginDetails.contactDetails, []),
      emergencySecondaryContactDetails: new FormControl(this.loginDetails.emergencySecondaryContactDetails, []),
      referredBy: new FormControl(this.loginDetails.referredBy, [Validators.required]),
      userName: new FormControl(this.loginDetails.userName, [Validators.required, Validators.pattern(Patterns.email)]),
      // password: new FormControl(this.loginDetails.agencyName, [Validators.required, Validators.pattern(Patterns.password)]),
      // confirmPassword: new FormControl(this.loginDetails.agencyName, [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submit() {
    if (!this.agencyForm.controls['name']?.value) {
      return this.notificationService.showError('Please enter name');
    }

    if (!this.agencyForm.controls['currentLocation']?.value) {
      return this.notificationService.showError('Please enter currentLocation');
    }

    if (this.agencyForm.controls['password']?.value || this.agencyForm.controls['confirmPassword']?.value) {
      if (this.agencyForm.controls['password']?.value !== this.agencyForm.controls['confirmPassword']?.value) {
        return this.notificationService.showError('Password and confirm password not matched');
      }
    }

    const data: any = {
      "name": this.agencyForm.controls['name']?.value,
      "currentLocation": this.agencyForm.controls['currentLocation']?.value
    }

    if (this.agencyForm.controls['password']?.value) {
      data['password'] = this.agencyForm.controls['password']?.value;
    }

    this.acrSericeService.updateregister(this.loginDetails?._id, data).subscribe((response) => {
      if (response?.status) {
        this.localStorageService.setLogger(response?.data);
        this.notificationService.showSuccess(response?.message || 'Detailed Updated successfully');
        window.location.reload();
      } else {
        this.notificationService.showError(response?.message || 'Detailed Not Updated.');
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'Detailed Not Updated.');
    });
  }

}