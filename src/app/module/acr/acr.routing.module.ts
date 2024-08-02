import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcrComponent } from './acr.component';
import { AcrFormComponent } from './acr-form/acr-form.component';

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
        path: "acr-form",
        component: AcrFormComponent
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
