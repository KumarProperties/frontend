import { Component } from '@angular/core';
import { fader } from './animations';
import { ApiService } from '../app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
  RouterOutlet,
} from '@angular/router';

import { ModalService } from 'src/app/modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader],
})
export class AppComponent {
  title = 'Kumar World Properties';
  dataBot: string = '24295193';
  urlBot: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.kenyt.ai/botapp/ChatbotUI/dist/js/bot-loader.js'
  );
  constructor(
    private router: Router,
    private modalService: ModalService,
    private apiService: ApiService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        (window as any).scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    this.apiService.data$.subscribe((data) => {
      this.dataBot = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalService.open('POPUP');
    }, 1000);
    setTimeout(() => {
      this.modalService.open('COOKIE');
    }, 3000);
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  // recievedDataBot(data: any) {
  //   this.dataBot = data;
  //   console.log('Updated Data Bot!!!!!');
  // }
}
