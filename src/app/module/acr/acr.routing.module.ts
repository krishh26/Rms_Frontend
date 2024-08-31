import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcrComponent } from './acr.component';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { AcrProfileComponent } from './acr-profile/acr-profile.component';
import { AcrAccordianCardComponent } from './acr-accordian-card/acr-accordian-card.component';
import { MyCandidatePageComponent } from './my-candidate-page/my-candidate-page.component';
import { CirAllJobsComponent } from './cir-all-jobs/cir-all-jobs.component';
import { AcrAdminComponent } from './acr-admin/acr-admin.component';
import { AcrUploadDetailsComponent } from './acr-upload-details/acr-upload-details.component';

const routes: Routes = [
  {
    path: "acr-register",
    component: AcrFormComponent
  },
  {
    path: "acr-login",
    component: AcrLoginComponent
  },
  {
    path: "acr-admin",
    // canActivate: [AuthGuard],
    component: AcrAdminComponent
  },
  {
    path: "acr-accordian-card",
    // canActivate: [AuthGuard],
    component: AcrAccordianCardComponent
  },
  {
    path: '',
    component: AcrComponent,
    children: [
      {
        path: "acr-profile",
        // canActivate: [AuthGuard],
        component: AcrProfileComponent
      },
      {
        path: "acr-candidate-page",
        // canActivate: [AuthGuard],
        component: MyCandidatePageComponent
      },
      {
        path: "acr-all-jobs",
        // canActivate: [AuthGuard],
        component: CirAllJobsComponent
      },
      {
        path: "acr-upload-details",
        // canActivate: [AuthGuard],
        component: AcrUploadDetailsComponent
      },
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "acr-card"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcrRoutingModule { }
