import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { ActivatedRoute, Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cir-form',
  templateUrl: './cir-form.component.html',
  styleUrls: ['./cir-form.component.css']
})
export class CirFormComponent implements OnInit {
  personalDetailForm!: FormGroup;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  user_id: string = '';
  register_data: any;
  showUKVisaType: boolean = false;
  lookingFor: any[] = [];
  captchaToken: string = '';
  captchaError = false;
  workPreference: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.initializeForms();
    const localData: any = localStorage.getItem('rmsPersonalDetails');
    if (localData || localData !== undefined || localData !== 'undefined') {
      this.setFormValues(JSON.parse(localData));
    }
    this.route.queryParams.pipe().subscribe((params) => {
      if (params['code']) {
        localStorage.setItem('referCode', params['code'])
      }
    });
  }

  ngOnInit() {
    // if (this.register_data?.user) {
    //   this.setFormValues(this.register_data);
    // }
  }

  setFormValues(data: any) {
    this.personalDetailForm.patchValue({
      name: data?.name || '',
      email: data?.email || '',
      countrycode: data?.countrycode || '',
      phoneNumber: data?.phoneNumber || '',
      nationality: data?.nationality || '',
      UKVisaType: data?.UKVisaType || '',
      UKDrivinglicense: (data?.UKDrivinglicense ? 'yes' : 'no' ),
      postalCode: data?.postalCode || '',
      currentWork: data?.currentWork || '',
      noticePeriodDay: data?.noticePeriodDay || '',
    });

    this.lookingFor = data?.lookingFor;
    this.workPreference = data?.workPreference;
    this.showUKVisaType = data?.nationality === 'other';
  }

  selectedLookingFor(type: string): boolean {
    return this.lookingFor?.includes(type);
  }

  selectedWorkPreference(type: string): boolean {
    return this.workPreference?.includes(type);
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  selectedRoles: string[] = [];

  onCheckboxChange(event: any) {
    const value = event.target.value;

    if (event.target.checked) {
      if (!this.selectedRoles.includes(value)) {
        this.selectedRoles.push(value);
      }
    } else {
      this.selectedRoles = this.selectedRoles.filter(role => role !== value);
    }
  }

  workPreferenceSelection: string[] = [];

  onCheckboxWorkPReference(event: any) {
    const value = event.target.value;

    if (event.target.checked) {
      if (!this.workPreferenceSelection.includes(value)) {
        this.workPreferenceSelection.push(value);
      }
    } else {
      this.workPreferenceSelection = this.workPreferenceSelection.filter(role => role !== value);
    }
  }

  initializeForms() {
    this.personalDetailForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(Patterns.name)]),
      email: new FormControl('', [Validators.required, Validators.pattern(Patterns.email)]),
      countrycode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      UKVisaType: new FormControl('', [Validators.required]),
      UKDrivinglicense: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      currentWork: new FormControl('', [Validators.required]),
      lookingFor: new FormControl([], [Validators.required]),
      workPreference: new FormControl([], [Validators.required]),
      noticePeriodDay: new FormControl([], [Validators.required]),
    });
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

  onNationalityChange(event: Event): void {
    const selectedNationality = (event.target as HTMLSelectElement).value;
    this.showUKVisaType = selectedNationality === 'other';
  }

  submitPersonalDetail() {
    this.captchaError = !this.captchaToken;
    this.personalDetailForm.markAllAsTouched();
    const data = {
      name: this.personalDetailForm.controls['name'].value || '',
      email: this.personalDetailForm.controls['email'].value || '',
      countrycode: this.personalDetailForm.controls['countrycode'].value || '',
      phoneNumber: this.personalDetailForm.controls['phoneNumber'].value || '',
      nationality: this.personalDetailForm.controls['nationality'].value || '',
      UKVisaType: this.personalDetailForm.controls['UKVisaType'].value || '',
      UKDrivinglicense: this.personalDetailForm.controls['UKDrivinglicense'].value || '',
      postalCode: this.personalDetailForm.controls['postalCode'].value || '',
      currentWork: this.personalDetailForm.controls['currentWork'].value || '',
      lookingFor: this.selectedRoles.join(',') || this.lookingFor,
      workPreference : this.workPreferenceSelection.join(',') || this.workPreference,
      noticePeriodDay: this.personalDetailForm.controls['noticePeriodDay'].value || '',
      captchaToken: this.captchaToken,
    }
    localStorage.setItem('rmsPersonalDetails', JSON.stringify(data));
    this.router.navigate(['/cir/cir-accordian-card-details']);
    // const data = new FormData();
    // data.append('name', this.personalDetailForm.controls['name'].value || '');
    // data.append('email', this.personalDetailForm.controls['email'].value || '');
    // data.append('countrycode', this.personalDetailForm.controls['countrycode'].value || '');
    // data.append('phoneNumber', this.personalDetailForm.controls['phoneNumber'].value || '');
    // data.append('nationality', this.personalDetailForm.controls['nationality'].value || '');
    // data.append('UKVisaType', this.personalDetailForm.controls['UKVisaType'].value || '');
    // data.append('UKDrivinglicense', this.personalDetailForm.controls['UKDrivinglicense'].value || '');
    // data.append('postalCode', this.personalDetailForm.controls['postalCode'].value || '');
    // data.append('currentWork', this.personalDetailForm.controls['currentWork'].value || '');
    // data.append('lookingFor', this.selectedRoles.join(','));

    // this.cirservice.register(data).subscribe((response) => {
    //   if (response?.status) {
    //     this.localStorageService.setLogger(response?.data);
    //     this.router.navigate(['/cir/cir-accordian-card-details']);
    //     this.notificationService.showSuccess('Success !');
    //   } else {
    //     this.notificationService.showError('Fill all the fields to proceed to next Page');
    //   }
    // }, (error) => {
    //   this.notificationService.showError('Fill all the fields to proceed to next Page');
    // });
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
