import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-profile',
  templateUrl: './cir-profile.component.html',
  styleUrls: ['./cir-profile.component.css']
})
export class CirProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loginDetails!: any;

  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private cirSericeService: CirSericeService
  ) {
    const loginData = this.localStorageService.getLogger();
    if (loginData) {
      this.loginDetails = loginData;
      this.initializeForms();
    }
  }

  ngOnInit() {
  }

  initializeForms() {
    this.profileForm = new FormGroup({
      profilePhoto: new FormControl('', [Validators.required]),
      userName: new FormControl(this.loginDetails.userName, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.required,Validators.pattern(Patterns.password)]),
      name: new FormControl(this.loginDetails.name, [Validators.required, Validators.pattern(Patterns.name)]),
      email: new FormControl(this.loginDetails.email, [Validators.required, Validators.pattern(Patterns.email)]),
      secondaryEmail: new FormControl(this.loginDetails.secondaryEmail, [Validators.pattern(Patterns.email)]),
      phoneNumber: new FormControl(this.loginDetails.phoneNumber, [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryPhoneNumber: new FormControl(this.loginDetails.secondaryPhoneNumber, [Validators.pattern(Patterns.mobile)]),
      dataOfBirth: new FormControl(this.loginDetails.dataOfBirth, [Validators.required]),
      education: new FormControl(this.loginDetails.education, [Validators.required]),
      courseName: new FormControl(this.loginDetails.courseName, [Validators.required]),
      qualificationAndCertification: new FormControl(this.loginDetails.qualificationAndCertification, [Validators.required]),
      currentLocation: new FormControl(this.loginDetails.currentLocation, [Validators.required]),
      nationality: new FormControl(this.loginDetails.nationality, [Validators.required]),
      UKDrivinglicense: new FormControl(this.loginDetails.UKDrivinglicense ? 'yes' : 'no', [Validators.required]),
      emergencyContact: new FormControl(this.loginDetails.emergencyContact, [Validators.required, Validators.pattern(Patterns.mobile)]),
      emergencyName: new FormControl(this.loginDetails.emergencyName, [Validators.required]),
      emergencyEmail: new FormControl(this.loginDetails.emergencyEmail, [Validators.required, Validators.pattern(Patterns.email)]),
    });
  }

  submit() {
    if (!this.profileForm.controls['name']?.value) {
      return this.notificationService.showError('Please enter name');
    }

    if (!this.profileForm.controls['currentLocation']?.value) {
      return this.notificationService.showError('Please enter currentLocation');
    }

    if (this.profileForm.controls['password']?.value || this.profileForm.controls['confirmPassword']?.value) {
      if (this.profileForm.controls['password']?.value !== this.profileForm.controls['confirmPassword']?.value) {
        return this.notificationService.showError('Password and confirm password not matched');
      }
    }

    const data: any = {
      "name": this.profileForm.controls['name']?.value,
      "currentLocation": this.profileForm.controls['currentLocation']?.value
    }

    if (this.profileForm.controls['password']?.value) {
      data['password'] = this.profileForm.controls['password']?.value;
    }

    this.cirSericeService.updateregister(this.loginDetails?._id, data).subscribe((response) => {
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
