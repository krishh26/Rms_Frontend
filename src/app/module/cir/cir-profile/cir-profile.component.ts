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
  showPasswordFields = false;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  file: any;
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

  initializeForms() {
    this.profileForm = new FormGroup({
      profile: new FormControl(this.loginDetails.profile.url, [Validators.required]),
      userName: new FormControl(this.loginDetails.userName, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      name: new FormControl(this.loginDetails.name, [Validators.required, Validators.pattern(Patterns.name)]),
      phoneNumber: new FormControl(this.loginDetails.phoneNumber, [Validators.required, Validators.pattern(Patterns.mobile)]),
      nationality: new FormControl(this.loginDetails.nationality, [Validators.required]),
      postalCode: new FormControl(this.loginDetails.postalCode),
    });
  }

  togglePasswordFields() {
    this.showPasswordFields = !this.showPasswordFields;
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
      this.notificationService.showError(error?.message || 'File not uploaded.')
    })
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

  submit() {
    if (!this.profileForm.controls['phoneNumber']?.value) {
      return this.notificationService.showError('Please enter phoneNumber');
    }

    if (!this.profileForm.controls['nationality']?.value) {
      return this.notificationService.showError('Please enter nationality');
    }

    if (!this.profileForm.controls['postalCode']?.value) {
      return this.notificationService.showError('Please enter postalCode');
    }

    if (this.profileForm.controls['password']?.value || this.profileForm.controls['confirmPassword']?.value) {
      if (this.profileForm.controls['password']?.value !== this.profileForm.controls['confirmPassword']?.value) {
        return this.notificationService.showError('Password and confirm password not matched');
      }
    }

    const data: any = {
      "phoneNumber": this.profileForm.controls['phoneNumber']?.value,
      "postalCode": this.profileForm.controls['postalCode']?.value,
      "nationality": this.profileForm.controls['nationality']?.value,
      "profile": this.file
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
