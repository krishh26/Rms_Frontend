import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AcrServiceService } from 'src/app/services/acr-service/acr-service.service';

@Component({
  selector: 'app-acr-form',
  templateUrl: './acr-form.component.html',
  styleUrls: ['./acr-form.component.css']
})
export class AcrFormComponent implements OnInit {
  agencyForm!: FormGroup;
  password = 'password';
  confirmPassword = 'password';
  showPassword = false;
  confirmShowPassword = false;
  user_id: string = '';
  register_data: any = [];
  file: any;
  selectedImage!: string;
  dropdownSettings = {};
  captchaToken: string = '';
  captchaError = false;

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

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private acrservice: AcrServiceService,
  ) {
    this.agencyForm = new FormGroup({
      agencyName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      location: new FormControl('', [Validators.required]),
      numberOfBranchesInUK: new FormControl('', [Validators.required]),
      personName: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      personDesignation: new FormControl('', [Validators.required]),
      personEmail: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(Patterns.mobile)]),
      secondaryPersonName: new FormControl('', [Validators.pattern(Patterns.name)]),
      secondaryPersonDesignation: new FormControl(''),
      secondaryPersonEmail: new FormControl('', [Validators.pattern(Patterns.email)]),
      secondaryPersonPhone: new FormControl('', [Validators.pattern(Patterns.mobile)]),
      callTime: new FormControl([], [Validators.required]),
      phoneNumberCountryCode: new FormControl([], [Validators.required]),
      secondaryPhoneNumberCountryCode: new FormControl([], [Validators.required]),
    });
    const localData: any = localStorage.getItem('rmsPersonalDetails');
    if (localData || localData !== undefined || localData !== 'undefined') {
      this.setFormValues(JSON.parse(localData));
    }
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  setFormValues(data: any) {
    console.log(data?.data?.user);

    this.agencyForm.patchValue({
      agencyName: data?.data?.user?.agencyName || '',
      location: data?.data?.user?.location || '',
      numberOfBranchesInUK: data?.data?.user?.numberOfBranchesInUK || '',
      personName: data?.data?.user?.personName || '',
      personDesignation: data?.data?.user?.personDesignation || '',
      personEmail: data?.data?.user?.personEmail || '',
      phoneNumber: data?.data?.user?.phoneNumber || '',
      secondaryPersonName: data?.data?.user?.secondaryPersonName || '',
      secondaryPersonDesignation: data?.data?.user?.secondaryPersonDesignation || '',
      secondaryPersonEmail: data?.data?.user?.secondaryPersonEmail || '',
      secondaryPersonPhone: data?.data?.user?.secondaryPersonPhone || '',
      callTime: data?.data?.user?.callTime || '',
      phoneNumberCountryCode: data?.data?.user?.phoneNumberCountryCode || '',
      secondaryPhoneNumberCountryCode: data?.data?.user?.secondaryPhoneNumberCountryCode || '',
    });
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
    this.file = event.target.files[0];
    this.selectedImage = this.file;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  // Function to be used for submit details
  submit() {
    this.captchaError = !this.captchaToken;
    const selectedTimes = this.agencyForm.controls['callTime'].value;
    const selectedTimesArray = Array.isArray(selectedTimes)
      ? selectedTimes.map((time: any) => time.label).filter((label: string) => label)
      : [];
    this.acrservice.register(this.agencyForm.value).subscribe((response) => {
      if (response?.status == true) {
        // localStorage.setItem('rmsPersonalDetails', JSON.stringify(response));
        this.agencyForm.reset();
        // this.router.navigate(['/acr/acr-accordian-card']);
        this.router.navigate(['/acr/acr-thankyou']);
        // this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message, 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message, 'Select different Username!');
    })
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

}
