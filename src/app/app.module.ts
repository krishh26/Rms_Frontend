import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CirModule } from './module/cir/cir.module';
import { AcrModule } from './module/acr/acr.module';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { provideToastr, ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APIInterceptor } from './shared/interceptor/ApiInterceptor';
import { ShowDataBaseModule } from './module/show-data-base/show-data-base.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AcrDatabaseModule } from './module/acr-database/acr-database.module';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CirModule,
    AcrModule,
    ShowDataBaseModule,
    AcrDatabaseModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ToastNoAnimationModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule,
  ],

  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
