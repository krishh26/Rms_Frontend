import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirComponent } from './cir.component';
import { CirRoutingModule } from './cir.rotuing.module';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirLoginComponent } from './cir-login/cir-login.component';
import { ManchesterDetailsComponent } from './manchester-details/manchester-details.component';
import { Dps21DetailsComponent } from './dps21-details/dps21-details.component';
import { NorthenIrelandDetailsComponent } from './Northen-Ireland-details/Northen-Ireland-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    CirRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
  ],
  declarations: [
    CirComponent,
    CirFormComponent,
    CirCardComponent,
    CirLoginComponent,
    ManchesterDetailsComponent,
    Dps21DetailsComponent,
    NorthenIrelandDetailsComponent
  ]
})
export class CirModule { }
