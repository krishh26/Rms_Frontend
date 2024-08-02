import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcrComponent } from './acr.component';
import { AcrRoutingModule } from './acr.routing.module';
import { AcrFormComponent } from './acr-form/acr-form.component';

@NgModule({
  imports: [
    CommonModule,
    AcrRoutingModule
  ],
  declarations: [AcrComponent,
    AcrFormComponent
  ]
})
export class AcrModule { }
