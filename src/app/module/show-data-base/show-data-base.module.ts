import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDatabaseComponent } from './show-database.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ShowDataBaseLoginComponent } from './show-data-base-login/show-data-base-login.component';
import { ShowDataBaseListComponent } from './show-data-base-list/show-data-base-list.component';
import { ShowDataBaseDetailsComponent } from './show-data-base-details/show-data-base-details.component';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';


const routes: Routes = [
  {
    path: "database-login",
    component: ShowDataBaseLoginComponent
  },
  {
    path: '',
    component: ShowDatabaseComponent,
    children: [
      {
        path: "list",
        // canActivate: [AuthGuard],
        component: ShowDataBaseListComponent
      },
      {
        path: "details/:type",
        // canActivate: [AuthGuard],
        component: ShowDataBaseDetailsComponent
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
    ShowDatabaseComponent,
    ShowDataBaseLoginComponent,
    ShowDataBaseListComponent,
    ShowDataBaseDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
  ]
})
export class ShowDataBaseModule { }
