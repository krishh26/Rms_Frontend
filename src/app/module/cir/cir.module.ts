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
import { ToastrModule } from 'ngx-toastr';
import { CirProfileComponent } from './cir-profile/cir-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CirForgotPasswrdComponent } from './cir-forgot-passwrd/cir-forgot-passwrd.component';
import { CirResetPasswordComponent } from './cir-reset-password/cir-reset-password.component';
import { CirOtherdetailsFormComponent } from './cir-otherdetails-form/cir-otherdetails-form.component';
import { CirRolesDemandCardComponent } from './cir-roles-demand-card/cir-roles-demand-card.component';
import { CirRolesDemandDetailsComponent } from './cir-roles-demand-details/cir-roles-demand-details.component';
import { CirReferEarnComponent } from './cir-refer-earn/cir-refer-earn.component';
import { CirAccordianCardComponent } from './cir-accordian-card/cir-accordian-card.component';
@NgModule({
  imports: [
    CommonModule,
    CirRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
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
    CirRolesDemandDetailsComponent,
    CirReferEarnComponent,

    CirAccordianCardComponent
  ]
})
export class CirModule { }
