import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GaEvent } from '../ga-event';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //  form submit or not status

  private formSubmittedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  formSubmitted$: Observable<boolean> =
    this.formSubmittedSubject.asObservable();

  // add title to dropdown  projects

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  // project specific chatBot
  private projectBot = new BehaviorSubject<any>('24295193');
  data$ = this.projectBot.asObservable();
  updateData(newData: any) {
    this.projectBot.next(newData);
  }

  // GTM tag code
  pushEvent({ event, ...data }: GaEvent) {
    console.log('🌿 => GaService => pushEvent => { event, ...data }:', {
      event,
      data,
    });

    (window as any).gtag('event', event, data);
  }
  //
  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }

  setFormSubmitted(status: boolean): void {
    this.formSubmittedSubject.next(status);
  }

  getTestimonials() {
    return this.http.get('assets/map-json/testimonials.json');
  }

  getProjects(params?: any) {
    return this.http.get(environment.url.server + 'app/apartment/', {
      params,
    });
  }
  getTrendingProjects(params?: any) {
    return this.http.get(environment.url.server + 'app/trending/apartment', {
      params,
    });
  }
  getDummyProjects() {
    return this.http.get('assets/map-json/projects.json');
  }

  postQlead(data: any) {
    return this.http.post('https://quadraleads.in:8135/api/qleads', {
      body: data,
    });
  }

  getAptTypes(location: any) {
    return this.http.get(environment.url.server + 'app/apartment/apt_types', {
      params: location,
    });
  }
  getAptSize(AptType: any) {
    return this.http.get(environment.url.server + 'app/apartment/apt_sizes', {
      params: { ...AptType },
    });
  }
  getProject(projectId: string) {
    return this.http.get(environment.url.server + 'app/apartment/', {
      params: {
        slug: projectId,
      },
    });
  }

  getBlogs(params?: any) {
    return this.http.get(environment.url.server + 'app/blogs/', {
      params: { id: params ? params : '' },
    });
  }
  getActivity(id?: string) {
    return this.http.get(environment.url.server + 'app/activity/' + id);
  }
  getAllEvent() {
    return this.http.get(environment.url.server + 'app/activity?type=EVENT');
  }
  getAllCSR() {
    return this.http.get(
      environment.url.server + 'app/activity?type=CSR_ACTIVITY'
    );
  }
  getAllExhibition() {
    return this.http.get(
      environment.url.server + 'app/activity?type=EXHIBITION'
    );
  }

  getAllBlogs() {
    return this.http.get(environment.url.server + 'app/blogs/');
  }
  getCities() {
    return this.http.get(environment.url.server + 'app/apartment/apt_cities');
  }

  getLocations(city: string) {
    return this.http.get(
      environment.url.server + 'app/apartment/apt_locations',
      {
        params: { city_id: city },
      }
    );
  }
  submitCareerForm(formData: any) {
    return this.http.post(
      environment.url.server + 'app/careers/resume',
      formData
    );
  }
}
