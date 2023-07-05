import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchPhotoComponent } from './search-photo/search-photo.component';
import { SearchVideoComponent } from './search-video/search-video.component';
import { PagePhotoComponent } from './page-photo/page-photo.component';
import { PageVideoComponent } from './page-video/page-video.component';
import { UserDeskComponent } from './user-desk/user-desk.component';
import { RequestService } from './shared/request.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    SearchPhotoComponent,
    SearchVideoComponent,
    PagePhotoComponent,
    PageVideoComponent,
    UserDeskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule
  ],
  providers: [
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
