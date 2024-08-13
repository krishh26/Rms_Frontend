import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../shared/constant/validation-patterns.const';
import { Router } from '@angular/router';
import { CirSericeService } from 'src/app/services/cir-service/cir-serice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cir-form',
  templateUrl: './cir-form.component.html',
  styleUrls: ['./cir-form.component.css']
})
export class CirFormComponent implements OnInit {
  formType: string = 'personalDetails' // 'personalDetails', 'otherDetails', 'loginDetails'
  personalDetailForm!: FormGroup;
  otherDetailForm!: FormGroup;
  loginDetailForm!: FormGroup;
  password = 'password';
  showPassword = false;
  confirmPassword = 'password';
  confirmShowPassword = false;
  user_id: string = '';
  register_data: any = [];
  file: any;
  selectedImage!: any;
  showUKVisaType: boolean = false;
  lookingFor: any[] = [];

  constructor(
    private router: Router,
    private cirservice: CirSericeService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
  ) {
    this.initializeForms();
    this.register_data = this.localStorageService.getLogger();
    if (this.register_data) {
      this.setFormValues(this.register_data?.user);
    }
  }

  ngOnInit() {
    if (this.register_data?.user) {
      this.setFormValues(this.register_data);
    }
  }

  setFormValues(data: any) {
    this.personalDetailForm.patchValue({
      name: data?.user?.name || '',
      email: data?.user?.email || '',
      countrycode: data?.user?.countrycode || '',
      phoneNumber: data?.user?.phoneNumber || '',
      nationality: data?.user?.nationality || '',
      UKVisaType: data?.user?.UKVisaType || '',
      UKDrivinglicense: data?.user?.UKDrivinglicense ? 'yes' : 'no' || '',
      postalCode: data?.user?.postalCode || '',
      currentWork: data?.user?.currentWork || ''
    });

    this.lookingFor = data?.user?.lookingFor;
    this.showUKVisaType = data?.user?.nationality === 'other';
  }

  selectedLookingFor(type: string): boolean {
    return this.lookingFor?.includes(type);
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
    const data = new FormData();
    data.append('name', this.personalDetailForm.controls['name'].value || '');
    data.append('email', this.personalDetailForm.controls['email'].value || '');
    data.append('countrycode', this.personalDetailForm.controls['countrycode'].value || '');
    data.append('phoneNumber', this.personalDetailForm.controls['phoneNumber'].value || '');
    data.append('nationality', this.personalDetailForm.controls['nationality'].value || '');
    data.append('UKVisaType', this.personalDetailForm.controls['UKVisaType'].value || '');
    data.append('UKDrivinglicense', this.personalDetailForm.controls['UKDrivinglicense'].value || '');
    data.append('postalCode', this.personalDetailForm.controls['postalCode'].value || '');
    data.append('currentWork', this.personalDetailForm.controls['currentWork'].value || '');
    data.append('lookingFor', this.selectedRoles.join(','));

    this.cirservice.register(data).subscribe((response) => {
      if (response?.status) {
        this.localStorageService.setLogger(response?.data);
        this.router.navigate(['/cir/cir-accordian-card-details']);
        this.notificationService.showSuccess('Success !');
      } else {
        this.notificationService.showError('Fill all the fields to proceed to next Page');
      }
    }, (error) => {
      this.notificationService.showError('Fill all the fields to proceed to next Page');
    });
  }


  fileUpload(event: any): void {
    this.file = event.target.files[0];
    // this.selectedImage = this.file;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.selectedImage = event.target.result;
    }
    reader.readAsDataURL(this.file);
  }

  submitOtherDetails() {
    this.cirservice.updateregister(this.user_id, this.otherDetailForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.router.navigate(['/cir/cir-card']);
        this.notificationService.showSuccess(response?.message, 'Success !');
      } else {
        this.notificationService.showError(response?.message, 'Select different Username!');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message, 'Select different Username!');
    })
  }

  // Function to be used for submit login Details
  submitLoginDetails() {
    this.formType = 'loginDetails';
    this.router.navigate(['/cir/cir-login']);
  }

  // previous step
  previousStep(type: string) {
    this.formType = type;
  }
}
