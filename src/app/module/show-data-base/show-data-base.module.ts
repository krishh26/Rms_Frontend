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
import { NgxPaginationModule } from 'ngx-pagination';
import { FutureCardDetailsComponent } from './future-card-details/future-card-details.component';
import { ShowCirJobApplicationsComponent } from './show-cir-job-applications/show-cir-job-applications.component';
import { SendCirJobMailComponent } from './send-cir-job-mail/send-cir-job-mail.component';


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
        canActivate: [AuthGuard],
        component: ShowDataBaseListComponent
      },
      {
        path: "details/:type",
        canActivate: [AuthGuard],
        component: ShowDataBaseDetailsComponent
      },
      {
        path: "card/details/:id",
        canActivate: [AuthGuard],
        component: FutureCardDetailsComponent
      },
      {
        path: "job-applications/:id",
        canActivate: [AuthGuard],
        component: ShowCirJobApplicationsComponent
      },
      {
        path: "send-mail/:id",
        canActivate: [AuthGuard],
        component: SendCirJobMailComponent
      },
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "database-login"
  }
];


@NgModule({
  declarations: [
    ShowDatabaseComponent,
    ShowDataBaseLoginComponent,
    ShowDataBaseListComponent,
    ShowDataBaseDetailsComponent,
    FutureCardDetailsComponent,
    ShowCirJobApplicationsComponent,
    SendCirJobMailComponent
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
  ]
})
export class ShowDataBaseModule { }
