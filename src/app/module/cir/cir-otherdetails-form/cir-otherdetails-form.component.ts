import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Patterns } from 'src/app/shared/constant/validation-patterns.const';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  referredByOptions: number[] = [];
  dropdownSettings = {};
  showValidUptoDate: boolean = false;

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
    { label: 'Anyday', value: 'Anyday' },
    { label: 'Mon', value: 'Mon' },
    { label: 'Tue', value: 'Tue' },
    { label: 'Wed', value: 'Wed' },
    { label: 'Thu', value: 'Thu' },
    { label: 'Fri', value: 'Fri' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Sun', value: 'Sun' }
  ];

  file: any;
  constructor(
    private cirSericeService: CirSericeService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
  ) {

    for (let i = 0; i <= 2; i++) {
      this.referredByOptions.push(i);
    }

  }

  ngOnInit() {
    this.initializeForms();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.otherDetailForm.get('sc_dv_clearance_hold')?.valueChanges.subscribe((value) => {
      this.setWillingToUndertakeVisibility();
      if (value === 'yes') {
        this.otherDetailForm.get('sc_dv_valid_upto')?.setValidators([Validators.required]);
      } else {
        this.otherDetailForm.get('sc_dv_valid_upto')?.clearValidators();
        this.otherDetailForm.get('sc_dv_valid_upto')?.setValue('');
      }
      this.otherDetailForm.get('sc_dv_valid_upto')?.updateValueAndValidity();
    });
  }

  setWillingToUndertakeVisibility(): void {
    const scDvClearanceValue = this.otherDetailForm.get('sc_dv_clearance_hold')?.value;
    if (scDvClearanceValue !== 'no') {
      // Hide and reset the "willing_to_undertake" control if SC/DV clearance is not "No"
      this.otherDetailForm.get('willing_to_undertake')?.reset();
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  wordCountValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const wordCount = control.value.trim().split(/\s+/).length;
        if (wordCount > maxWords) {
          return { 'wordCount': { value: control.value, maxWords: maxWords, actualWords: wordCount } };
        }
      }
      return null;
    };
  }

  initializeForms() {
    this.otherDetailForm = new FormGroup({
      workLocation: new FormControl([]),
      currency: new FormControl('', [Validators.required]),
      expectedDayRate: new FormControl('', [Validators.required]),
      referredBy: new FormControl(Number(localStorage.getItem('referCode') || 0), [Validators.required]),
      callDay: new FormControl([], [Validators.required]),
      callTime: new FormControl([], [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(Patterns.password)]),
      anyQuestion: new FormControl(''),
      cv: new FormControl('', [Validators.required]),
      sc_dv_clearance_hold: new FormControl('', [Validators.required]),
      sc_dv_valid_upto: new FormControl(''),
      willing_to_undertake: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
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
      this.notificationService.showError(error?.error?.message || 'File not uploaded.')
    })
  }

  submit() {
    const localData: any = localStorage.getItem('rmsPersonalDetails');
    if (!localData || localData == undefined || localData == 'undefined') {
      return this.submitotherDetail();
    }

    this.cirSericeService.register(JSON.parse(localData)).subscribe((response) => {
      if (response?.status) {
        console.log('response?.data', response?.data);
        this.localStorageService.setLogger(response?.data);
        setTimeout(() => {
          localStorage.removeItem('rmsPersonalDetails');
          // this.submitRoles();
          this.submitotherDetail();
        }, 300);
      } else {
        this.notificationService.showError(response?.message || 'Fill all the fields of register page to proceed to next Page');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Fill all the fields of register page to proceed to next Page');
    });
  }


  submitotherDetail() {
    if (!this.file) {
      return this.notificationService.showError('Please upload file');
    }
    const selectedDays = this.otherDetailForm.controls['callDay'].value;
    const selectedDaysArray = Array.isArray(selectedDays)
      ? selectedDays.map((day: any) => day.label).filter((label: string) => label)
      : [];

    const selectedTimes = this.otherDetailForm.controls['callTime'].value;
    const selectedTimesArray = Array.isArray(selectedTimes)
      ? selectedTimes.map((time: any) => time.label).filter((label: string) => label)
      : [];

    const cvObject = {
      key: this.file?.key,
      url: this.file?.url,
      name: this.file?.name
    };
    const formData = {
      ...this.otherDetailForm.value,
      callDay: selectedDaysArray,
      callTime: selectedTimesArray,
      cv: cvObject
    };
    this.userdata = this.localStorageService.getLogger();
    this.userID = this.userdata?.user?._id;
    this.otherDetailForm.controls['cv'].patchValue(cvObject);
    this.cirSericeService.updateregister(this.userID, formData).subscribe(
      (response) => {
        if (response?.status == true) {
          this.router.navigate(['/cir/cir-thankyou']);
          this.notificationService.showSuccess(response?.message, 'Success !');
          localStorage.removeItem('rmsRolesDetails');
        } else {
          this.notificationService.showError(response?.message, 'Select different Username!');
        }
        localStorage.removeItem('referCode');
      },
      (error) => {
        this.notificationService.showError(error?.error?.message, 'Select different Username!');
      }
    );
  }


  submitRoles() {
    const rolesData: any = localStorage.getItem('rmsRolesDetails');
    if (rolesData || rolesData !== undefined || rolesData !== 'undefined') {
      this.userdata = this.localStorageService.getLogger();
      this.userID = this.userdata?.user?._id
      const roles = JSON.parse(rolesData);
      this.cirSericeService.updateUserClient(roles, this.userID).subscribe((response) => {
        if (response?.status) {
          this.notificationService.showSuccess('Client update Successful');
          localStorage.removeItem('rmsRolesDetails');
          // this.router.navigate(['/cir/cir-otherdetails-form']);
        } else {
          this.notificationService.showError('User not referred');
        }
      }, (error) => {
        this.notificationService.showError(error?.error?.message || 'User not referred');
      }
      );
    }
  }

  onSCDVChange(event: any) {
    this.showValidUptoDate = event.target.value === 'yes';
  }

  onSubmit() {
    if (this.otherDetailForm.valid) {
      const formData = this.otherDetailForm.value;
      
      // If SC/DV is No, remove the valid_upto field from the payload
      if (formData.sc_dv_clearance_hold === 'no') {
        delete formData.sc_dv_valid_upto;
      }

      // Your existing submit logic here
      console.log('Form Data:', formData);
    }
  }
}
