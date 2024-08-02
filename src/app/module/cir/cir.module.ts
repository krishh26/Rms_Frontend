import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirComponent } from './cir.component';
import { CirRoutingModule } from './cir.rotuing.module';
import { CirFormComponent } from './cir-form/cir-form.component';
import { CirCardComponent } from './cir-card/cir-card.component';
import { CirTableComponent } from './cir-table/cir-table.component';

@NgModule({
  imports: [
    CommonModule,
    CirRoutingModule
  ],
  declarations: [CirComponent,
    CirFormComponent,
    CirCardComponent,
    CirTableComponent
  ]
})
export class CirModule { }
