import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-cir-login',
  templateUrl: './cir-login.component.html',
  styleUrls: ['./cir-login.component.css']
})
export class CirLoginComponent implements OnInit {
  loginForm: FormGroup;
  password = 'password';
  showPassword = false;
  DecodedToken: any = [];
  captchaToken: string = '';
  captchaError = false;

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)])
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    this.captchaError = !this.captchaToken;
    if (this.loginForm.valid && this.captchaToken) {
      const loginData = {
        ...this.loginForm.value, // Spread operator to include form data (email, password)
        captchaToken: this.captchaToken, // Include the CAPTCHA token
      };
      this.cirservice.loginUser(loginData).subscribe((response) => {
        if (response?.status == true) {
          const token = response?.data?.token;
          this.DecodedToken = jwtDecode(token);
          console.log('Decoded Token:', this.DecodedToken);
          localStorage.setItem("DecodedToken", JSON.stringify(this.DecodedToken));
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
          this.router.navigate(['/cir/cir-active-roles']);
          this.notificationService.showSuccess(response?.message);
        } else {
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
  }

  onCaptchaResolved(token: string | null): void {
    if (token) {
      this.captchaToken = token; // Set the resolved token
      this.captchaError = false; // Clear error
    } else {
      this.captchaToken = ''; // Reset if CAPTCHA fails to resolve
      this.captchaError = true; // Show error
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
