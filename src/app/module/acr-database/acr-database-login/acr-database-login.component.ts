import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-acr-database-login',
  templateUrl: './acr-database-login.component.html',
  styleUrls: ['./acr-database-login.component.css']
})
export class AcrDatabaseLoginComponent implements OnInit {
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
    if (this.loginForm.valid) {
      this.databaseservice.loginUser(this.loginForm.value).subscribe((response) => {
        if (response?.status == true) {
          localStorage.setItem('loginSource', 'acr-database');
          this.localStorageService.setLoginToken(response?.data);
          this.localStorageService.setLogger(response?.data?.user);
          this.router.navigate(['/acr-database/acr-database-list']);
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
