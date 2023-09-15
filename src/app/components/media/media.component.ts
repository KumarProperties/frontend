import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  constructor(private media: ApiService, private route: Router) {}
  eventData: any = [];
  CSRData: any = [];
  exhibitionData: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;

  page2: number = 1;
  count2: number = 0;
  tableSize2: number = 8;

  page3: number = 1;
  count3: number = 0;
  tableSize3: number = 6;
  tableSizes: any = [6, 12, 18, 24];
  selectedTab: string = 'EVENT';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

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
  cardsPerPage: number = 6;
  currentPage: number = 1;
  visibleCards: string[] = [];

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }
  updateTableSize(size: number) {
    this.tableSize = size;
  }
  updateVisibleCards(): void {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    this.visibleCards = this.cards.slice(startIndex, endIndex);
  }

  onCardsPerPageChange(): void {
    this.currentPage = 1;
    this.updateVisibleCards();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleCards();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisibleCards();
    }
  }
  index = 1;
  on(listener: string, query: string, fn: (el: Event) => void): void {
    document.querySelectorAll(query).forEach((item) => {
      item.addEventListener(listener, (el) => {
        fn(el);
      });
    });
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

    this.media.getAllEvent().subscribe((res: any) => {
      this.eventData = res.data;
      console.log(this.eventData, 'media Data');
      // this.blogsData.forEach((element: any) => {});
    });

    this.media.getAllCSR().subscribe((res: any) => {
      this.CSRData = res.data;
      console.log(this.CSRData, 'CSR Data');
      // this.blogsData.forEach((element: any) => {});
    });
    this.media.getAllExhibition().subscribe((res: any) => {
      this.exhibitionData = res.data;
      console.log(this.exhibitionData, 'Exhibition Data');
      // this.blogsData.forEach((element: any) => {});
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    console.log(this.page, 'pagination1');
  }
  onTableDataChange2(event: any) {
    this.page2 = event;
    console.log(this.page2, 'pagination2');
  }
  onTableDataChange3(event: any) {
    this.page3 = event;
    console.log(this.page3, 'pagination3');
  }
  gotopage(id: any) {
    console.log(id);
    this.route.navigate(['/event-detail', id]);
  }
}
