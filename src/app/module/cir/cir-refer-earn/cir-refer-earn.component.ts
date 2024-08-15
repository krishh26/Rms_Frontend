import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
  ) {
    this.referForm = this.fb.group({
      candidates: this.fb.array([
        this.createCandidateFormGroup()
      ])
    });
  }

  createCandidateFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      job_title: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.loginUser = this.localStorageService.getLogger();
    this.referredBy = this.loginUser?.referredBy
  }
  get candidates(): FormArray {
    return this.referForm.get('candidates') as FormArray;
  }

  addCandidate() {
    this.candidates.push(this.createCandidateFormGroup());
  }

  removeCandidate(index: number) {
    this.candidates.removeAt(index);
  }

  submit() {
    this.referForm.markAllAsTouched();
    if (!this.referForm.valid) {
      return this.notificationService.showError('Add at least one candidate detail to send the referral.');
    }

    this.cirSericeService.referAndEarn(this.candidates.value).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess('Refer and Earn Successful');
        this.router.navigate(['/cir/cir-refer-earn-thank-you']);
        this.referForm.reset();
      } else {
        return this.notificationService.showError('User not referred');
      }
    }, (error) => {
      return this.notificationService.showError(error?.message || 'User not referred');
    });
  }
}
