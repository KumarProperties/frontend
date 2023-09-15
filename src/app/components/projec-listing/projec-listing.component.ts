import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ApiService } from 'src/app/services/api.service';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnimationOptions } from 'ngx-lottie';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projec-listing',
  templateUrl: './projec-listing.component.html',
  styleUrls: ['./projec-listing.component.css'],
})
export class ProjecListingComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      { name: 'Project', value: 'Project page' },
      { name: 'Keyword', value: '2 & 3 bhk flats pune' },
      { name: 'URL', value: '2-3-bhk-flats-pune' },
      {
        name: 'Title',
        value: '2-3 BHK Flats Pune | Luxurious flats in Pune | Kumar Corp',
      },
      {
        name: 'Description',
        value:
          'Kumar Corp - Top builders in Pune for commercial - residential properties. 135+ projects, 40,000 happy customers, 32 million sq ft delivered.',
      },
    ]);
  }
  allProjects: any = [];
  unfilteredProjects: any = [];
  currentProjectDetails: any = {};
  aptTypes: any = [];
  slidesInstance: any;
  aptSizes: any = [];
  cities: any = [];
  locations: any = [];
  initialExploreProject: string = 'kumar-paradise';
  @ViewChild('firstFilter') firstFilter!: ElementRef;

  // Lottie animation
  options: AnimationOptions = {
    path: '/assets/map-json/swipeRight.json',
  };

  //
  ngOnInit() {
    this.apiService.getProjects().subscribe({
      next: (res: any) => {
        this.allProjects = res.data;

        console.log(this.allProjects, 'fghjk');
      },
    });

    this.apiService.getProjects().subscribe({
      next: (res: any) => {
        (this.allProjects = res.data), (this.unfilteredProjects = res.data);
        this.allProjects = this.allProjects.filter(
          (project: any) =>
            project.propertyType == this.selectedTab.toUpperCase()
        );
        this.allProjects = this.allProjects.sort((a: any, b: any) => {
          if (a.status === 'Ongoing' && b.status !== 'Ongoing') {
            return -1;
          } else if (a.status !== 'Ongoing' && b.status === 'Ongoing') {
            return 1;
          } else {
            return 0;
          }
        });
      },

      error: () => {
        this.allProjects = this.apiService.getDummyProjects().subscribe({
          next: (res: any) => (
            (this.allProjects = res.data), (this.unfilteredProjects = res.data)
          ),
        });
      },
    });

    this.apiService.getCities().subscribe({
      next: ({ data }: any) => {
        this.cities = data.cities;
        console.log(this.cities);
      },
    });
  }

  // onAnimate(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }
  focusOut(ev: any) {
    setTimeout(() => {
      (document.getElementById('filter-switch1') as any).checked! = false;
    }, 100);
    console.log('focusing out');
  }

  currentProject(details: any) {
    this.currentProjectDetails = {
      title_animation: this.currentProjectDetails.title_animation,
      subtitle_animation: this.currentProjectDetails.subtitle_animation,
      ...details,
    };
    this.currentProjectDetails.title_animation.restart();
    this.currentProjectDetails.subtitle_animation.restart();
  }

  scrollToTop() {
    (window as any).scrollTo({ top: 0, behavior: 'instant' });
  }

  selectedTab: string = 'residential';

  apply() {
    this.searchProjects();
    this.showModal = false;
  }
  clear() {
    this.selectedOption1 = 'select';
    this.selectedOption2 = 'select';
    this.selectedLocationId = 'select';
    this.selectedCityId = 'select';
    this.selectedOption3 = 'select';
    this.selectedOption4 = 'select';
    this.selectedOption5 = 'all';
  }
  viewAll() {
    this.clear();

    if (this.selectedTab == 'residential') {
      this.apiService
        .getProjects({ property_type: 'RESIDENTIAL' })
        .subscribe(({ data }: any) => {
          this.allProjects = data;
        });
    } else {
      this.apiService
        .getProjects({ property_type: 'COMMERCIAL' })
        .subscribe(({ data }: any) => {
          this.allProjects = data;
        });
    }
    this.showModal = false;
  }
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.allProjects = this.unfilteredProjects
      .filter((project: any) => project.propertyType == tab.toUpperCase())
      .sort((a: any, b: any) => {
        if (a.status === 'Ongoing' && b.status !== 'Ongoing') {
          return -1;
        } else if (a.status !== 'Ongoing' && b.status === 'Ongoing') {
          return 1;
        } else {
          return 0;
        }
      });

    this.slidesInstance.restart();

    this.currentProject(this.allProjects[0]);

    if (this.selectedTab == 'commercial' || this.selectedTab == 'residential') {
      this.clear();
    }
    if (this.selectedTab == 'commercial') {
      this.initialExploreProject = 'kumar-primus';
    } else if (this.selectedTab == 'residential') {
      this.initialExploreProject = 'kumar-paradise';
    }
  }

  selectedOption1: string = 'select';
  selectedLocationId: string = '';

  selectedCityId: string = '';
  selectedOption2: string = 'select';
  selectedOption3: string = 'select';
  selectedOption4: string = 'select';
  selectedOption5: string = 'all';
  dropdownheight = '40px';
  initialHeight = '40px';

  ngAfterViewInit() {
    gsap.fromTo(
      '.tabs_wrap',
      {
        y: -60,
        opacity: 0,
        duration: 1.5,
        ease: 'power1.out',
      },
      { y: 0, opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(
      '.item_wrap',
      {
        opacity: 0,
        delay: 2,
        duration: 1,
        ease: 'power1.out',
      },
      { opacity: 1, duration: 3 }
    );
    setTimeout(() => {
      let scroll = document.querySelector('.inner-wrapper');
      console.log(scroll?.clientHeight, 'TimelineHeight');
    }, 1000);
    this.currentProjectDetails.subtitle_animation = gsap.fromTo(
      '.kumarProjects p',
      {
        y: 60,
        opacity: 0,
        duration: 1.8,
        ease: 'power1.out',
      },
      { y: 0, opacity: 1, duration: 1.8 }
    );
    this.currentProjectDetails.title_animation = gsap.fromTo(
      '.kumarProjects h1',
      {
        y: 60,
        opacity: 0,
        duration: 1.8,
        ease: 'power1.out',
      },
      { y: 0, opacity: 1, duration: 1.5 }
    );
    this.slidesInstance = gsap.from('.inner-wrapper', {
      x: '100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });
    gsap.fromTo(
      '.explore',
      {
        opacity: 0,
        delay: 2,
        duration: 1,
        ease: 'power1.out',
      },
      { opacity: 1, duration: 3 }
    );
  }
  onOptionClick1(option: string, id: string) {
    this.selectedOption1 = option;
    this.selectedCityId = id;
    this.selectedOption2 = 'select';
    this.selectedOption3 = 'select';
    this.selectedOption4 = 'select';
    this.selectedOption5 = 'all';
    this.spinner.show();
    this.apiService.getLocations(id).subscribe({
      next: ({ data }: any) => {
        this.spinner.hide();

        console.log(data);
        this.locations = data.locations;
        console.log(this.locations, 'project locations');
      },
    });
    console.log('hsd', this.firstFilter);
    setTimeout(() => {
      document.getElementById('filter-switch1')?.click();
      document.getElementById('filter-switch1-m')?.click();
    }, 100);

    console.log(this.firstFilter);
    this.searchProjects();
  }

  onOptionClick2(option: string, id: string) {
    this.selectedOption2 = option;
    this.selectedLocationId = id;
    this.spinner.show();
    if (this.selectedTab == 'residential') {
      this.apiService
        .getAptTypes({ location_id: id, property_type: 'RESIDENTIAL' })
        .subscribe(({ data }: any) => {
          this.spinner.hide();
          this.aptTypes = data.apt_type;
        });
    } else {
      this.apiService
        .getAptTypes({ location_id: id, property_type: 'COMMERCIAL' })
        .subscribe(({ data }: any) => {
          this.spinner.hide();
          this.aptTypes = data.apt_type;
        });
    }
    this.searchProjects();
  }

  onOptionClick3(option: string) {
    this.selectedOption3 = option;
    this.spinner.show();
    this.apiService
      .getAptSize({
        location_id: this.selectedLocationId,
        apt_type: this.selectedOption3,
      })
      .subscribe({
        next: ({ data }: any) => {
          this.spinner.hide();
          this.aptSizes = data.apt_sizes;
        },
      });
    this.searchProjects();
  }

  onOptionClick4(option: string) {
    this.selectedOption4 = option;
    this.searchProjects();
  }

  onOptionClick5(option: string) {
    this.selectedOption5 = option;
    this.searchProjects();
  }

  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const toggle = document.querySelector(
      '.dropdown__switch'
    ) as HTMLInputElement;
    if (this.dropdownheight === 'auto') {
      this.dropdownheight = this.initialHeight; // Set to the initial height
    } else {
      this.dropdownheight = 'auto'; // Set to 'auto' height
    }
    if (target === toggle) return;

    const isDropdownChild = target.closest('.dropdown__filter');

    if (!isDropdownChild) {
      toggle.checked = false;
    }
  }
  searchProjects() {
    console.log();
    this.spinner.show();
    this.apiService
      .getProjects({
        city_id: this.selectedCityId == 'select' ? '' : this.selectedCityId,
        location_id:
          this.selectedLocationId == 'select' ? '' : this.selectedLocationId,
        apt_type: this.selectedOption3 == 'select' ? '' : this.selectedOption3,
        status: this.selectedOption5 == 'select' ? '' : this.selectedOption5,
        property_type:
          this.selectedTab == 'residential' ? 'RESIDENTIAL' : 'COMMERCIAL',
      })
      .subscribe({
        next: ({ data }: any) => {
          this.spinner.hide();
          this.allProjects = data;
          this.slidesInstance.restart();

          this.currentProject(this.allProjects[0]);
        },
      });
  }
  showImageDetails(id: number) {
    const imgId = id;
    this.router.navigate(['project/' + imgId]);
    console.log('i m called');
  }

  //  mobile view modal
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  changeheight() {
    this.dropdownheight = 'auto';
  }

  ngOnDestroy() {
    ScrollTrigger.killAll();
  }
}
