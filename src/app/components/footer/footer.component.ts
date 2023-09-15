import { Component } from '@angular/core';
import { ModalService } from 'src/app/modal-service.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private modalService: ModalService) {}
  scrollToTop() {
    // @ts-ignore
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  openCommonForm() {
    console.log('Open Common Form');
    this.modalService.open('COMMON_FORM');
    console.log('Tried');
  }
}
