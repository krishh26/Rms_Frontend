import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CirModule } from './module/cir/cir.module';
import { AcrModule } from './module/acr/acr.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CirModule,
    AcrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
