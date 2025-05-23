import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrComponent } from './acr.component';
import { AcrRoutingModule } from './acr.routing.module';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrTableComponent } from './acr-table/acr-table.component';
import { AcrCardComponent } from './acr-card/acr-card.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { AcrProfileComponent } from './acr-profile/acr-profile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AcrAccordianCardComponent } from './acr-accordian-card/acr-accordian-card.component';
import { MyCandidatePageComponent } from './my-candidate-page/my-candidate-page.component';
import { CirAllJobsComponent } from './cir-all-jobs/cir-all-jobs.component';
import { AcrAdminComponent } from './acr-admin/acr-admin.component';
import { AcrUploadDetailsComponent } from './acr-upload-details/acr-upload-details.component';
import { AcrThankyouComponent } from './acr-thankyou/acr-thankyou.component';
import { AcrResetPasswordComponent } from './acr-reset-password/acr-reset-password.component';
import { AcrAddCandidateComponent } from './acr-add-candidate/acr-add-candidate.component';
import { AcrAdminLoginComponent } from './acr-admin-login/acr-admin-login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AcrForgotPasswordComponent } from './acr-forgot-password/acr-forgot-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { AcrCreateContractComponent } from './acr-create-contract/acr-create-contract.component';

@NgModule({
  imports: [
    CommonModule,
    AcrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    ToastNoAnimationModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule,
  ],

  declarations: [
    AcrComponent,
    AcrFormComponent,
    AcrTableComponent,
    AcrCardComponent,
    AcrLoginComponent,
    AcrProfileComponent,
    AcrAccordianCardComponent,
    MyCandidatePageComponent,
    CirAllJobsComponent,
    AcrAdminComponent,
    AcrUploadDetailsComponent,
    AcrThankyouComponent,
    AcrResetPasswordComponent,
    AcrAddCandidateComponent,
    AcrAdminLoginComponent,
    AcrForgotPasswordComponent,
    AcrCreateContractComponent
  ],
  providers: [
    NgbActiveModal, // Add this line
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class AcrModule { }
