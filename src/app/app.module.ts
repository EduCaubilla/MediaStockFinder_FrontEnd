import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchPhotoComponent } from './search-photo/search-photo.component';
import { SearchVideoComponent } from './search-video/search-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    SearchPhotoComponent,
    SearchVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
