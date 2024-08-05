import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcrComponent } from './acr.component';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrTableComponent } from './acr-table/acr-table.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { AcrCardComponent } from './acr-card/acr-card.component';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { AcrProfileComponent } from './acr-profile/acr-profile.component';

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
    path: '',
    component: AcrComponent,
    children: [
    
      {
        path: "acr-card",
        canActivate : [AuthGuard],
        component: AcrCardComponent
      },
      {
        path: "acr-manchester-details",
        canActivate : [AuthGuard],
        component: ManchesterDetailsComponent
      },
      {
        path: "acr-northern-ireland-details",
        canActivate : [AuthGuard],
        component: NorthenIrelandDetailsComponent
      },
      {
        path: "acr-dps21-details",
        canActivate : [AuthGuard],
        component: Dps21DetailsComponent
      },
      {
        path: "acr-profile",
        canActivate : [AuthGuard],
        component: AcrProfileComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "acr-login"
      }
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcrRoutingModule { }
