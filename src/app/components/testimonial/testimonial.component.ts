import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent {
  testimonialsData: any = [];
  testimonialNames: any = [];
  testimonialVideos: any = [];
  filteredData: any = [];
  testimonialLength: number = 0;
  constructor(
    private testimonials: ApiService,
    public sanitizer: DomSanitizer,
    private route: Router
  ) {}
  // dropupAuto = false;
  // toggleDropupAuto() {
  //   this.dropupAuto = !this.dropupAuto;
  // }

  cards: string[] = [
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6',
    'Card 7',
    'Card 8',
    'Card 9',
    'Card 10',
    'Card 11',
    'Card 12',
  ];

  // cardsPerPage: number = 6;
  // currentPage: number = 1;
  visibleCards: string[] = [];

  selectedYear: string = '2019';
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [6, 12, 18, 24];
  selectedProject: string = '';
  // get totalPages(): number {
  //   return Math.ceil(this.cards.length / this.cardsPerPage);
  // }

  updateVisibleCards(): void {
    const startIndex = (this.page - 1) * this.page;
    const endIndex = startIndex + this.page;
    this.visibleCards = this.testimonialVideos.slice(startIndex, endIndex);
  }

  onCardsPerPageChange(event: any): void {
    this.page = 1;
    this.updateVisibleCards();
    this.tableSize = event.target.value;
  }

  updateTableSize(size: number) {
    this.tableSize = size;
  }

  // filter for showing testimonials on project selected

  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updateVisibleCards();
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updateVisibleCards();
  //   }
  // }

  filterCards(): void {
    this.visibleCards = this.testimonialVideos.filter((card: any) => {
      const matchesProject =
        this.selectedProject === '' || card.includes(this.selectedProject);
      const matchesYear =
        this.selectedYear === '' || card.includes(this.selectedYear);
      return matchesProject && matchesYear;
    });
    this.page = 1;
  }

  viewAllCards(): void {
    this.filteredData = this.testimonialVideos;
    document.querySelectorAll('.desktopView .selectBtn').forEach((el) => {
      (el as any).innerHTML = 'Select';
    });
  }
  index = 1;

  on(listener: string, query: string, fn: (el: Event) => void): void {
    document.querySelectorAll(query).forEach((item) => {
      item.addEventListener(listener, (el) => {
        fn(el);
      });
    });
  }
  focusOut(ev: Event) {
    console.log('outta focus');
    (ev.target as HTMLElement)
      .querySelector('.toggle')!
      .classList.toggle('toggle');
  }
  ngOnInit(): void {
    this.updateVisibleCards();
    this.on('click', '.selectBtn', (item: Event) => {
      const next: any = (item.target as HTMLElement).nextElementSibling;
      next.classList.toggle('toggle');
      next.style.zIndex = this.index++;
    });
    this.on('click', '.option', (item: Event) => {
      const target: any = item.target as HTMLElement;
      try {
        target.parentElement.classList.remove('toggle');
        target.parentElement.parentElement.classList.remove('toggle');
        target.parentElement.parentElement.parentElement.classList.remove(
          'toggle'
        );
      } catch (error) {
        console.log(error);
      }

      console.log(target.parentElement.parentElement, 'parent');
      const parent = target.closest('.select')!.children[0] as HTMLElement;
      parent.setAttribute('data-type', target.getAttribute('data-type')!);
      parent.innerText = target.innerText;
      console.log(parent, 'parent elm');
    });

    this.testimonials.getTestimonials().subscribe((res: any) => {
      this.testimonialsData = res;
      console.log(this.testimonialsData, 'Testimonial Data');
      this.testimonialsData.forEach((element: any) => {
        if (element.link != 'Iryn46Fh4oE') {
          this.testimonialVideos.push({
            url: this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + element.link
            ),
            title: element.title,
            project: element.project,
          });
        }
      });

      this.filteredData = this.testimonialVideos;

      console.log(this.filteredData, 'okkk');
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  projectFilter(project: string) {
    this.selectedProject = project;
    console.log(
      this.selectedProject,
      this.testimonialVideos,
      this.filteredData,
      'projectssssss'
    );
    this.filteredData = [];
    this.testimonialVideos.forEach((e: any) => {
      if (e.project == this.selectedProject) {
        this.filteredData.push({
          url: this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' + e.link
          ),
          title: e.title,
          project: e.project,
        });
      }
    });
  }
}
