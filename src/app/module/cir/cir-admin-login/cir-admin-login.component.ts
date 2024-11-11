import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cir-admin-login',
  templateUrl: './cir-admin-login.component.html',
  styleUrls: ['./cir-admin-login.component.css']
})
export class CirAdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  password = 'password';
  showPassword = false;

  constructor(
    private router: Router,
    private acrservice: AcrServiceService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.acrservice.adminloginUser(this.loginForm.value).subscribe((response) => {
        if (response?.status == true) {
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
          this.router.navigate(['/cir/cir-create-job']);
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
  }
}
