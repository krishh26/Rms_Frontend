import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CirComponent } from './cir.component';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirTableComponent } from './cir-table/cir-table.component';

const routes: Routes = [
  {
    path: '',
    component: CirComponent,
    children: [
      {
        path: "cir",
        component: CirComponent
      },
      {
        path: "cir-form",
        component: CirFormComponent
      },
      {
        path: "cir-card",
        component: CirCardComponent
      },
      {
        path: "cir-table",
        component: CirTableComponent

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
export class CirRoutingModule { }
