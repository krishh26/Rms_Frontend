import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'acr',
    loadChildren: () => import('./module/acr/acr.module').then(m => m.AcrModule)
  },
  {
    path: 'cir',
    loadChildren: () => import('./module/cir/cir.module').then(m => m.CirModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
