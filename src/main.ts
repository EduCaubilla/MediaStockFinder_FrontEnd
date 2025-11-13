// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { AppRoutingModule, routes } from './app/app-routing.module';
import { RequestService } from './app/shared/request.service';
import { environment } from './environments/environment';
import { UserGuard } from './app/user.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(AppRoutingModule),
    provideHttpClient(withInterceptorsFromDi()),
    RequestService,
    UserGuard
  ]
})
  .catch(err => console.error(err));
