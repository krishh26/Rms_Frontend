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
  {
    path: 'database',
    loadChildren: () => import('./module/show-data-base/show-data-base.module').then(m => m.ShowDataBaseModule)
  },
  {
    path: 'acr-database',
    loadChildren: () => import('./module/acr-database/acr-database.module').then(m => m.AcrDatabaseModule)
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "cir/cir-login"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
