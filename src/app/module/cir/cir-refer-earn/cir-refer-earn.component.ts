import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cir-refer-earn',
  templateUrl: './cir-refer-earn.component.html',
  styleUrls: ['./cir-refer-earn.component.css']
})
export class CirReferEarnComponent implements OnInit {
  referForm!: FormGroup;
  loginUser: any = [];
  referredBy : string ='';

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
   // this.loginUser = this.localStorageService.getLogger();
    this.referForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      job_title: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() {
    this.loginUser = this.localStorageService.getLogger();
    this.referredBy = this.loginUser?.referredBy
  }

  submit() {
    this.referForm.markAllAsTouched();
    if (!this.referForm.valid) {
      return this.notificationService.showError('Add atleast 1 candidate detail to send the referral.');
    }

    this.cirSericeService.referAndEarn([this.referForm.value]).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess('Refer and Earn Successful');
        this.router.navigate(['/cir/cir-refer-earn-thank-you']);
        this.referForm.reset();
      } else {
        return this.notificationService.showError('User not refer');
      }
    }, (error) => {
      return this.notificationService.showError(error?.message || 'User not refer');
    });
  }
}
