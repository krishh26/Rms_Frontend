import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cir-refer-earn',
  templateUrl: './cir-refer-earn.component.html',
  styleUrls: ['./cir-refer-earn.component.css']
})
export class CirReferEarnComponent implements OnInit {
  referForm!: FormGroup;

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router : Router
  ) {
    this.referForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
    });
  }

  ngOnInit() {
  }

  submit() {
    this.referForm.markAllAsTouched();
    if (!this.referForm.valid) {
      return this.notificationService.showError('Please fill all details');
    }

    this.cirSericeService.referAndEarn(this.referForm.value).subscribe((response) => {
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
