import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ExploreComponent } from './explore/explore.component';
import { MoreModule } from './more/more.module';
import { AboutComponent } from './more/about/about.component';
import { LicenseComponent } from './more/license/license.component';
import { FAQsComponent } from './more/faqs/faqs.component';
import { LegalComponent } from './more/legal/legal.component';
import { SignupComponent } from './signup/signup.component';
import { SearchPhotoComponent } from './search-photo/search-photo.component';
import { SearchVideoComponent } from './search-video/search-video.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagePhotoComponent } from './page-photo/page-photo.component';
import { PageVideoComponent } from './page-video/page-video.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'more', component: MoreModule },
  { path: 'about', component: AboutComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'faqs', component: FAQsComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search-photo/:search', component: SearchPhotoComponent },
  { path: 'search-video/:search', component: SearchVideoComponent },
  { path: 'photo-page/:type/:id', component: PagePhotoComponent },
  { path: 'video-page/:type/:id', component: PageVideoComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
