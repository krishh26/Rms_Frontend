import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrComponent } from './acr.component';
import { AcrRoutingModule } from './acr.routing.module';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrTableComponent } from './acr-table/acr-table.component';
import { AcrCardComponent } from './acr-card/acr-card.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AcrProfileComponent } from './acr-profile/acr-profile.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    AcrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    AcrComponent,
    AcrFormComponent,
    AcrTableComponent,
    AcrCardComponent,
    AcrLoginComponent,
    AcrProfileComponent,
    Dps21DetailsComponent,
    NorthenIrelandDetailsComponent,
    ManchesterDetailsComponent
  ]
})
export class AcrModule { }
