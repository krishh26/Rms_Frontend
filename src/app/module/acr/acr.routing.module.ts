import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcrComponent } from './acr.component';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrTableComponent } from './acr-table/acr-table.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';

const routes: Routes = [
  {
    path: '',
    component: AcrComponent,
    children: [
      {
        path: "acr",
        component: AcrComponent
      },
      {
        path: "acr-register",
        component: AcrFormComponent
      },
      {
        path: "acr-table",
        component: AcrTableComponent
      },
      {
        path: "acr-login",
        component: AcrLoginComponent
      },
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
