import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirComponent } from './cir.component';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirLoginComponent } from './cir-login/cir-login.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { CirProfileComponent } from './cir-profile/cir-profile.component';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { CirResetPasswordComponent } from './cir-reset-password/cir-reset-password.component';
import { CirForgotPasswrdComponent } from './cir-forgot-passwrd/cir-forgot-passwrd.component';
import { CirReferEarnComponent } from './cir-refer-earn/cir-refer-earn.component';
import { CirRolesDemandCardComponent } from './cir-roles-demand-manchaster-card/cir-roles-demand-card.component';
import { CirOtherdetailsFormComponent } from './cir-otherdetails-form/cir-otherdetails-form.component';
import { CirAccordianCardComponent } from './cir-accordian-card/cir-accordian-card.component';
import { CirRolesDemandNothernIrelandDetailsComponent } from './cir-roles-demand-nothern-ireland-details/cir-roles-demand-nothern-ireland-details.component';
import { CirRolesDemandAllOverUkDetailsComponent } from './cir-roles-demand-all-over-uk-details/cir-roles-demand-all-over-uk-details.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';
import { ThankYouReferComponent } from './thank-you-refer/thank-you-refer.component';

const routes: Routes = [
  {
    path: '',
    component: CirComponent,
    children: [
      {
        path: "cir-card",
        //canActivate: [AuthGuard],
        component: CirCardComponent
      },
      {
        path: "manchester-details",
        //canActivate: [AuthGuard],
        component: ManchesterDetailsComponent
      },
      {
        path: "northern-ireland-details",
        //canActivate: [AuthGuard],
        component: NorthenIrelandDetailsComponent
      },
      {
        path: "dps21-details",
        //canActivate: [AuthGuard],
        component: Dps21DetailsComponent
      },
      {
        path: "cir-profile",
        //canActivate: [AuthGuard],
        component: CirProfileComponent
      },
      {
        path: "cir-roles-demand-manchester-card",
        //canActivate: [AuthGuard],
        component: CirRolesDemandCardComponent
      },
      {
        path: "cir-roles-demand-northern-ireland-card",
        //canActivate: [AuthGuard],
        component: CirRolesDemandNothernIrelandDetailsComponent
      },
      {
        path: "cir-roles-demand-all-over-uk-card",
        //canActivate: [AuthGuard],
        component: CirRolesDemandAllOverUkDetailsComponent
      },
      {
        path: "cir-refer-earn",
        //canActivate: [AuthGuard],
        component: CirReferEarnComponent
      },
      {
        path: "cir-refer-earn-thank-you",
        //canActivate: [AuthGuard],
        component: ThankYouReferComponent
      }
    ]
  },
  {
    path: "cir-thankyou",
    component: ThankyouPageComponent
  },
  {
    path: "cir-login",
    component: CirLoginComponent
  },
  {
    path: "cir-accordian-card-details",
    component: CirAccordianCardComponent
  },
  {
    path: "cir-register",
    component: CirFormComponent
  },
  {
    path: "cir-otherdetails-form",
    component: CirOtherdetailsFormComponent
  },
  {
    path: "cir-reset-password",
    component: CirResetPasswordComponent
  },
  {
    path: "cir-forgot-password",
    component: CirForgotPasswrdComponent
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "cir-card"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirRoutingModule { }
