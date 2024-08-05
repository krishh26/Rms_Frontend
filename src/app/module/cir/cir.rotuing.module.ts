import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirComponent } from './cir.component';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirLoginComponent } from './cir-login/cir-login.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { CirHeaderComponent } from './cir-header/cir-header.component';
import { CirProfileComponent } from './cir-profile/cir-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CirComponent,
    children: [
      {
        path: "cir-login",
        component: CirLoginComponent
      },
      {
        path: "cir-register",
        component: CirFormComponent
      },
      {
        path: "cir-card",
        component: CirCardComponent
      },
      {
        path: "manchester-details",
        component: ManchesterDetailsComponent
      },
      {
        path: "northern-ireland-details",
        component: NorthenIrelandDetailsComponent
      },
      {
        path: "dps21-details",
        component: Dps21DetailsComponent
      },
      {
        path: "card-header",
        component: CirHeaderComponent
      },
      {
        path: "cir-profile",
        component: CirProfileComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "cir-login"
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
export class CirRoutingModule { }
