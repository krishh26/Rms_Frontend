import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cir-refer-earn',
  templateUrl: './cir-refer-earn.component.html',
  styleUrls: ['./cir-refer-earn.component.css']
})
export class CirReferEarnComponent implements OnInit {
  skillsForm: FormGroup;
  loginUser: any = [];
  referredBy: string = '';

  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    // this.loginUser = this.localStorageService.getLogger();
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.loginUser = this.localStorageService.getLogger();
    this.referredBy = this.loginUser?.referredBy
  }

  get skills(): FormArray | any {
    return this.skillsForm.get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      name: '',
      email: '',
      jobTitle: ''
    })
  }

  addSkills() {
    console.log(this.skills)
    this.skills.push(this.newSkill());
    this.cdr.markForCheck();
  }

  trackByFn(index: number, skill: any): number {
    return index;
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
    console.log(this.skillsForm.value);
  }

  submit() {
    console.log(this.skillsForm.value);
    // this.referForm.markAllAsTouched();
    // if (!this.referForm.valid) {
    //   return this.notificationService.showError('Please fill all details');
    // }

    // this.cirSericeService.referAndEarn(this.referForm.value).subscribe((response) => {
    //   if (response?.status) {
    //     this.notificationService.showSuccess('Refer and Earn Successful');
    //     this.router.navigate(['/cir/cir-refer-earn-thank-you']);
    //     this.referForm.reset();
    //   } else {
    //     return this.notificationService.showError('User not refer');
    //   }
    // }, (error) => {
    //   return this.notificationService.showError(error?.message || 'User not refer');
    // });
  }
}
