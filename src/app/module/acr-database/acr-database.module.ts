import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { AcrDatabaseLoginComponent } from './acr-database-login/acr-database-login.component';
import { AcrDatabaseComponent } from './acr-database.component';
import { AcrDatabaseListComponent } from './acr-database-list/acr-database-list.component';
import { AcrDatabaseDetailsComponent } from './acr-database-details/acr-database-details.component';
import { UserRolesDetailsComponent } from './user-roles-details/user-roles-details.component';
import { AppliedApplicantsDetailsComponent } from './applied-applicants-details/applied-applicants-details.component';


const routes: Routes = [
  {
    path: "acr-database-login",
    component: AcrDatabaseLoginComponent
  },
  {
    path: '',
    component: AcrDatabaseComponent,
    children: [
      {
        path: "acr-database-list",
        // canActivate: [AuthGuard],
        component: AcrDatabaseListComponent
      },
      {
        path: "acr-details/details/:type",
        // canActivate: [AuthGuard],
        component: AcrDatabaseDetailsComponent
      },
      {
        path: "acr-details/role-details",
        // canActivate: [AuthGuard],
        component: UserRolesDetailsComponent
      },
      {
        path: "acr-details/applied-aplicants-details",
        // canActivate: [AuthGuard],
        component: AppliedApplicantsDetailsComponent
      },
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login"
  }
];

@NgModule({
  declarations: [
    AcrDatabaseLoginComponent,
    AcrDatabaseDetailsComponent,
    AcrDatabaseListComponent,
    AcrDatabaseComponent,
    UserRolesDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
  ],
})
export class AcrDatabaseModule { }
