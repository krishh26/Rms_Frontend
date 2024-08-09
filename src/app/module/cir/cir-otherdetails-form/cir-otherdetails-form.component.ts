import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-cir-otherdetails-form',
  templateUrl: './cir-otherdetails-form.component.html',
  styleUrls: ['./cir-otherdetails-form.component.css']
})
export class CirOtherdetailsFormComponent implements OnInit {
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  otherDetailForm!: FormGroup;
  userID!: string;
  userdata: any = [];

  timeSlots = [
    { label: '1-2 AM', value: 1 },
    { label: '2-3 AM', value: 2 },
    { label: '3-4 AM', value: 3 },
    { label: '4-5 AM', value: 4 },
    { label: '5-6 AM', value: 5 },
    { label: '6-7 AM', value: 6 },
    { label: '7-8 AM', value: 7 },
    { label: '8-9 AM', value: 8 },
    { label: '9-10 AM', value: 9 },
    { label: '10-11 AM', value: 10 },
    { label: '11-12 AM', value: 11 },
    { label: '12-1 PM', value: 12 },
    { label: '1-2 PM', value: 13 },
    { label: '2-3 PM', value: 14 },
    { label: '3-4 PM', value: 15 },
    { label: '4-5 PM', value: 16 },
    { label: '5-6 PM', value: 17 },
    { label: '6-7 PM', value: 18 },
    { label: '7-8 PM', value: 19 },
    { label: '8-9 PM', value: 20 },
    { label: '9-10 PM', value: 21 },
    { label: '10-11 PM', value: 22 },
    { label: '11-12 PM', value: 23 }
  ];

  daysOfWeek = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' }
  ];

  file: any;
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private renderer: Renderer2

  ) {
    this.initializeForms();

    this.userdata = this.localStorageService.getLogger();
    this.userID = this.userdata?.user?._id
    console.log(this.userID);
    if (this.userdata) {
      this.setFormValues(this.userdata?.user);
    }
  }

  ngOnInit() {
    console.log(this.userdata?.user);
    if (this.userdata?.user) {
      this.setFormValues(this.userdata);
    }
  }

  initializeForms() {
    this.otherDetailForm = new FormGroup({

      workLocation: new FormControl([], [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      expectedDayRate: new FormControl('', [Validators.required]),
      referredBy: new FormControl('', [Validators.required]),
      callDay: new FormControl([], [Validators.required]),
      callTime: new FormControl([], [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      anyQuestion: new FormControl('', [Validators.required]),
      cv: new FormControl('', [Validators.required]),
    });
  }

  setFormValues(data: any) {
    if (data?.user) {
      this.otherDetailForm.patchValue({
        workLocation: Array.isArray(data?.user?.workLocation) ? data?.user?.workLocation : [],
        currency: data?.user?.currency || '',
        expectedDayRate: data?.user?.expectedDayRate || '',
        referredBy: data?.user?.referredBy || '',
        callDay: Array.isArray(data?.user?.callDay) ? data?.user?.callDay : [],
        callTime: Array.isArray(data?.user?.callTime) ? data?.user?.callTime : [],
        password: data?.user?.password || '',
        anyQuestion: data?.user?.anyQuestion || '',
        cv: data?.user?.cv || ''
      });
    }
  }

  selectedRoles: string[] = [];

  onCheckboxChange(event: any) {
    const workLocation: string[] = this.otherDetailForm.get('workLocation')?.value || [];
    if (event.target.checked) {
      workLocation.push(event.target.value);
    } else {
      const index = workLocation.indexOf(event.target.value);
      if (index > -1) {
        workLocation.splice(index, 1);
      }
    }
    this.otherDetailForm.patchValue({ workLocation: workLocation });
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

  fileUpload(event: any): void {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('files', file || '');

    this.cirSericeService.fileUpload(data).subscribe((response) => {
      if (response?.status) {
        this.file = response?.data;
        console.log(this.file);

        this.notificationService.showSuccess(response?.message || 'File successfully uploaded.')
      } else {
        this.notificationService.showError(response?.message || 'File not uploaded.')
      }
    }, (error) => {
      this.notificationService.showError(error?.message || 'File not uploaded.')
    })
  }

  submitotherDetail() {
    if (!this.file) {
      return this.notificationService.showError('Please upload file');
    }

    // Convert selected callDays and callTimes arrays to comma-separated strings
    const selectedDays = this.otherDetailForm.controls['callDay'].value;
    const selectedDaysString = Array.isArray(selectedDays) ? selectedDays.join(',') : '';

    const selectedTimes = this.otherDetailForm.controls['callTime'].value;
    const selectedTimesString = Array.isArray(selectedTimes) ? selectedTimes.join(',') : '';

    // Prepare the form data for submission
    const formData = {
      ...this.otherDetailForm.value,
      callDay: selectedDaysString,
      callTime: selectedTimesString
    };

    this.otherDetailForm.controls['cv'].patchValue(this.file);
    console.log(this.userID);
    this.cirSericeService.updateregister(this.userID, formData).subscribe((response) => {
      if (response?.status == true) {
        this.router.navigate(['/cir/cir-thankyou']);
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message, 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message, 'Select different Username!');
    })
  }


}
