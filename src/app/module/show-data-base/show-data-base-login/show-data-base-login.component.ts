import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-show-data-base-login',
  templateUrl: './show-data-base-login.component.html',
  styleUrls: ['./show-data-base-login.component.css']
})
export class ShowDataBaseLoginComponent {
  loginForm!: FormGroup;
  password = 'password';
  showPassword = false;

  constructor(
    private router: Router,
    private databaseservice: DatabaseService,
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
    // this.router.navigate(['/database/list']);
    if (this.loginForm.valid) {
      this.databaseservice.loginUser(this.loginForm.value).subscribe((response) => {
        if (response?.status == true) {
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
          this.router.navigate(['/database/list']);
        } else {
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
  }

  public showHidePass(): void {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }
}
