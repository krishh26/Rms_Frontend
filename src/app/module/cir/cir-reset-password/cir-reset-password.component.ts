import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-reset-password',
  templateUrl: './cir-reset-password.component.html',
  styleUrls: ['./cir-reset-password.component.css']
})
export class CirResetPasswordComponent implements OnInit {

  resetpasswordForm: FormGroup;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.resetpasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }


  ngOnInit() {
  }

  submit() {
    this.resetpasswordForm.markAllAsTouched();
    if (this.resetpasswordForm.valid) {
      this.cirservice.resetpassword(this.resetpasswordForm.value).subscribe((response) => {
        if (response?.status == true) {
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
        } else {
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
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

}
