import { Component } from '@angular/core';
import { ModalService } from 'src/app/modal-service.service';
import { ModalAbstract } from '../modal-abstract';
import * as bootstrap from 'bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css'],
})
export class CookieComponent extends ModalAbstract {
  constructor(
    modalService: ModalService,
    private cookieService: CookieService
  ) {
    super(modalService, 'COOKIE');
  }

  modal: any = '';
  ngAfterViewInit() {
    const el = document.getElementById('cookie') as HTMLElement;

    this.modal = new bootstrap.Modal(el);
  }
  open() {
    this.modal.show();
    console.log('showing the modal');
  }
  closeCookie() {
    this.modal.hide();
    const backDrop = document.querySelector('.modal-backdrop');
    console.log(backDrop), 'backdrop';
    backDrop?.remove();
  }
  acceptCookies() {
    this.cookieService.set('cookieConsent', 'true', 365);
    this.modal.hide();
  }
  hasConsented(): boolean {
    return this.cookieService.get('cookieConsent') === 'true';
  }
}
