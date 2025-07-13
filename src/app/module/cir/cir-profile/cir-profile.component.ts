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
  passwordForm!: FormGroup;
  loginDetails!: any;
  showPassword = false;
  confirmShowPassword = false;
  currentShowPassword = false;
  file: any;
  activeTab = 'profile'; // Default active tab

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
    console.log(this.loginDetails.profile.url);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  initializeForms() {
    // Profile form
    this.profileForm = new FormGroup({
      profile: new FormControl(this.loginDetails.profile.url, [Validators.required]),
      userName: new FormControl(this.loginDetails.userName, [Validators.required]),
      name: new FormControl(this.loginDetails.name, [Validators.required, Validators.pattern(Patterns.name)]),
      email: new FormControl(this.loginDetails.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.loginDetails.phoneNumber, [Validators.required, Validators.pattern(Patterns.mobile)]),
      nationality: new FormControl(this.loginDetails.nationality, [Validators.required]),
      postalCode: new FormControl(this.loginDetails.postalCode),
    });

    // Password form
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      currentPassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
    });
  }

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.cirSericeService.fileUpload(data).subscribe((response) => {
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

  public showHidePass(type: string): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
    } else if (type === 'confirmPassword') {
      this.confirmShowPassword = !this.confirmShowPassword;
    } else if (type === 'currentPassword') {
      this.currentShowPassword = !this.currentShowPassword;
    }
  }

  submitProfile() {
    if (this.profileForm.invalid) {
      return this.notificationService.showError('Please fill all required fields correctly');
    }

    const data: any = {
      "phoneNumber": this.profileForm.controls['phoneNumber'].value,
      "postalCode": this.profileForm.controls['postalCode'].value,
      "nationality": this.profileForm.controls['nationality'].value,
      "profile": this.file
    }

    this.cirSericeService.updateregister(this.loginDetails?._id, data).subscribe((response) => {
      if (response?.status) {
        this.localStorageService.setLogger(response?.data);
        this.notificationService.showSuccess(response?.message || 'Profile Updated successfully');
        window.location.reload();
      } else {
        this.notificationService.showError(response?.message || 'Profile Not Updated.');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Profile Not Updated.');
    });
  }

  submitPassword() {
    if (this.passwordForm.invalid) {
      return this.notificationService.showError('Please fill all password fields correctly');
    }

    if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirmPassword'].value) {
      return this.notificationService.showError('Password and confirm password do not match');
    }

    const data: any = {
      "currentPassword": this.passwordForm.controls['currentPassword'].value,
      "password": this.passwordForm.controls['password'].value
    }

    this.cirSericeService.updateregister(this.loginDetails?._id, data).subscribe((response) => {
      if (response?.status) {
        this.localStorageService.setLogger(response?.data);
        this.notificationService.showSuccess(response?.message || 'Password Updated successfully');
        this.passwordForm.reset();
      } else {
        this.notificationService.showError(response?.message || 'Password Not Updated.');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Password Not Updated.');
    });
  }
}
