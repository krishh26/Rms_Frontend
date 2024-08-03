import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrComponent } from './acr.component';
import { AcrRoutingModule } from './acr.routing.module';
import { AcrFormComponent } from './acr-form/acr-form.component';
import { AcrTableComponent } from './acr-table/acr-table.component';
import { AcrCardComponent } from './acr-card/acr-card.component';
import { AcrLoginComponent } from './acr-login/acr-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AcrRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AcrComponent,
    AcrFormComponent,
    AcrTableComponent,
    AcrCardComponent,
    AcrLoginComponent
  ]
})
export class AcrModule { }
