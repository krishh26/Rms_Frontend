import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirComponent } from './cir.component';
import { CirRoutingModule } from './cir.rotuing.module';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirLoginComponent } from './cir-login/cir-login.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { CirProfileComponent } from './cir-profile/cir-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CirForgotPasswrdComponent } from './cir-forgot-passwrd/cir-forgot-passwrd.component';
import { CirResetPasswordComponent } from './cir-reset-password/cir-reset-password.component';
import { CirOtherdetailsFormComponent } from './cir-otherdetails-form/cir-otherdetails-form.component';
import { CirRolesDemandCardComponent } from './cir-roles-demand-manchaster-card/cir-roles-demand-card.component';
import { CirReferEarnComponent } from './cir-refer-earn/cir-refer-earn.component';
import { CirAccordianCardComponent } from './cir-accordian-card/cir-accordian-card.component';
import { CirRolesDemandNothernIrelandDetailsComponent } from './cir-roles-demand-nothern-ireland-details/cir-roles-demand-nothern-ireland-details.component';
import { CirRolesDemandAllOverUkDetailsComponent } from './cir-roles-demand-all-over-uk-details/cir-roles-demand-all-over-uk-details.component';
import { ThankYouReferComponent } from './thank-you-refer/thank-you-refer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CirActiveRolesComponent } from './cir-active-roles/cir-active-roles.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    CirRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ToastNoAnimationModule.forRoot(),
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule

  ],
  declarations: [
    CirComponent,
    CirFormComponent,
    CirCardComponent,
    CirLoginComponent,
    ManchesterDetailsComponent,
    Dps21DetailsComponent,
    NorthenIrelandDetailsComponent,
    CirProfileComponent,
    CirForgotPasswrdComponent,
    CirResetPasswordComponent,
    CirOtherdetailsFormComponent,
    CirRolesDemandCardComponent,
    CirRolesDemandAllOverUkDetailsComponent,
    CirRolesDemandNothernIrelandDetailsComponent,
    CirReferEarnComponent,
    ThankYouReferComponent,
    CirAccordianCardComponent,
    CirActiveRolesComponent
  ]
})
export class CirModule { }
