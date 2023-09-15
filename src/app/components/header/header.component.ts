import { Component, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentPage: any = '';

  constructor(private elementRef: ElementRef, private router: Router) {
    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? (this.currentPage = event.url) : null;

      switch (this.currentPage) {
        case '/':
          this.onTabClick('home');
          break;
        case '/about-us':
          this.onTabClick('about');
          break;
        case '/projects':
          this.onTabClick('projects');
          break;
        case '/project':
          this.onTabClick('projects');
          break;
        case '/media':
          this.onTabClick('media');
          break;
        case '/testimonials':
          this.onTabClick('testimonials');
          break;
        case '/careers':
          this.onTabClick('careers');
          break;
        case '/contact':
          this.onTabClick('contact');
          break;

        default:
          this.onTabClick('');
          break;
      }
    });
  }

  activeTab: string = 'home';
  // showchatbott() {
  //   const chatbot = document.querySelector('#kenytChatBubble') as HTMLInputElement;
  //   if (chatbot) {
  //     chatbot.style.display = 'unset';
  //     console.log('i am called');
  //   }
  // }

  onTabClick(tab: string) {
    this.activeTab = tab;
  }

  ngAfterViewInit() {
    const modal = this.elementRef.nativeElement.querySelector('#menu');
    const hamburgerImage =
      this.elementRef.nativeElement.querySelector('.hamburger-img');
    modal.addEventListener('show.bs.modal', () => {
      const chatbot = document.querySelector(
        '#kenytChatBubble'
      ) as HTMLInputElement;
      if (chatbot) {
        chatbot.style.display = 'none';
      }
      gsap.fromTo(
        hamburgerImage,
        {
          x: 500,
          opacity: 0,
          duration: 2.5,
          ease: 'power1.out',
        },
        { x: 0, opacity: 1, duration: 2.5, ease: 'power1.out' }
      );

      gsap.fromTo(
        '.animate-header',
        {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        },
        { y: 0, opacity: 1, duration: 1.5 }
      );
      gsap.fromTo(
        '.animate-options',
        {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        },
        { y: 0, opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(
        '.animate-icons',
        {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        },
        { y: 0, opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(
        '.contact',
        {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        },
        { y: 0, opacity: 1, duration: 1.5 }
      );
    });
  }
}
