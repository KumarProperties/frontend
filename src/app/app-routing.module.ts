import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjecListingComponent } from './components/projec-listing/projec-listing.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MediaComponent } from './components/media/media.component';
import { MediaEventdetailComponent } from './components/media-eventdetail/media-eventdetail.component';
import { ExhibitionsdetailComponent } from './components/exhibitionsdetail/exhibitionsdetail.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CareeerComponent } from './components/careeer/careeer.component';
import { ContactComponent } from './components/contact/contact.component';
import { NriCornerComponent } from './components/nri-corner/nri-corner.component';
import { BlogsListingComponent } from './components/blogs-listing/blogs-listing.component';
import { BlogComponent } from './components/blog/blog.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { PoliciesComponent } from './components/policies/policies.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: ProjecListingComponent,
  },
  {
    path: 'project/:projectId',
    component: ProjectDetailComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'media',
    component: MediaComponent,
  },
  {
    path: 'event-detail/:eventId',
    component: MediaEventdetailComponent,
  },
  {
    path: 'exhibition-detail',
    component: ExhibitionsdetailComponent,
  },
  {
    path: 'testimonials',
    component: TestimonialComponent,
  },
  {
    path: 'careers',
    component: CareeerComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'nri-corner',
    component: NriCornerComponent,
  },
  {
    path: 'blogs-listing',
    component: BlogsListingComponent,
  },
  {
    path: 'blog/:blogId',
    component: BlogComponent,
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent,
  },

  {
    path: 'policies',
    component: PoliciesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
