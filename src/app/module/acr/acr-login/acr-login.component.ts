import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-acr-login',
  templateUrl: './acr-login.component.html',
  styleUrls: ['./acr-login.component.css']
})
export class AcrLoginComponent implements OnInit {
  loginForm!: FormGroup;
  password = 'password';
  showPassword = false;
  DecodedToken: any = [];
  captchaToken: string = '';
  captchaError = false;

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
    this.loginForm.markAllAsTouched(); // Mark all form fields as touched to trigger validation
    this.captchaError = !this.captchaToken; // Check if the CAPTCHA token is missing

    if (this.loginForm.valid && this.captchaToken) {
      // Define the loginData object including the CAPTCHA token
      const loginData = {
        ...this.loginForm.value, // Spread operator to include form data (email, password)
        captchaToken: this.captchaToken, // Include the CAPTCHA token
      };

      // Call the login API
      this.acrservice.loginUser(loginData).subscribe(
        (response) => {
          if (response?.status === true) {
            const token = response?.data?.token;
            this.DecodedToken = jwtDecode(token);
            console.log('Decoded Token:', this.DecodedToken);

            // Store token and user data in local storage
            localStorage.setItem("DecodedToken", JSON.stringify(this.DecodedToken));
            this.localStorageService.setLoginToken(response?.data);
            this.localStorageService.setLogger(response?.data?.user);

            // Redirect based on password reset status
            if (response?.data?.user?.password_reset === false) {
              this.router.navigate(['/acr/acr-reset-password']);
            } else {
              this.router.navigate(['/acr/acr-all-jobs']);
            }
          } else {
            this.notificationService.showError(response?.message);
          }
        },
        (error) => {
          this.notificationService.showError(error?.error?.message || 'Something went wrong!');
        }
      );
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
