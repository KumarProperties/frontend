import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjecListingComponent } from './components/projec-listing/projec-listing.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MediaComponent } from './components/media/media.component';
import { FormsModule } from '@angular/forms';
import { MediaEventdetailComponent } from './components/media-eventdetail/media-eventdetail.component';
import { ExhibitionsdetailComponent } from './components/exhibitionsdetail/exhibitionsdetail.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CareeerComponent } from './components/careeer/careeer.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonFormComponent } from './modals/common-form/common-form.component';
import { EnquireComponent } from './components/enquire/enquire.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NriCornerComponent } from './components/nri-corner/nri-corner.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BlogsListingComponent } from './components/blogs-listing/blogs-listing.component';
import { BlogComponent } from './components/blog/blog.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { PopupComponent } from './modals/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CookieComponent } from './modals/cookie/cookie.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProjecListingComponent,
    ProjectDetailComponent,
    AboutUsComponent,
    MediaComponent,
    MediaEventdetailComponent,
    ExhibitionsdetailComponent,
    TestimonialComponent,
    CareeerComponent,
    ContactComponent,
    FooterComponent,
    CommonFormComponent,
    EnquireComponent,
    NriCornerComponent,
    BlogsListingComponent,
    BlogComponent,
    DisclaimerComponent,
    PopupComponent,
    PoliciesComponent,
    CookieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
