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
import { CirRolesDemandCardComponent } from './cir-roles-demand-card/cir-roles-demand-card.component';
import { CirRolesDemandDetailsComponent } from './cir-roles-demand-details/cir-roles-demand-details.component';
import { CirOtherdetailsFormComponent } from './cir-otherdetails-form/cir-otherdetails-form.component';
import { CirAccordianCardComponent } from './cir-accordian-card/cir-accordian-card.component';

const routes: Routes = [
  {
    path: '',
    component: CirComponent,
    children: [
      {
        path: "cir-card",
    //    canActivate: [AuthGuard],
        component: CirCardComponent
      },
      {
        path: "manchester-details",
      //  canActivate: [AuthGuard],
        component: ManchesterDetailsComponent
      },
      {
        path: "northern-ireland-details",
      //  canActivate: [AuthGuard],
        component: NorthenIrelandDetailsComponent
      },
      {
        path: "dps21-details",
        canActivate: [AuthGuard],
        component: Dps21DetailsComponent
      },
      {
        path: "cir-profile",
       // canActivate: [AuthGuard],
        component: CirProfileComponent
      },
      {
        path: "cir-roles-demand-card",
     //   canActivate: [AuthGuard],
        component: CirRolesDemandCardComponent
      },
      {
        path: "cir-roles-demand-details",
       // canActivate: [AuthGuard],
        component: CirRolesDemandDetailsComponent
      },
      {
        path: "cir-accordian-card-details",
      //  canActivate: [AuthGuard],
        component: CirAccordianCardComponent
      },
    ]
  },
  {
    path: "cir-refer-earn",
   // canActivate: [AuthGuard],
    component: CirReferEarnComponent
  },
  {
    path: "cir-login",
    component: CirLoginComponent
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
