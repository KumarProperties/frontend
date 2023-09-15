import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import scrollTo from 'gsap/ScrollToPlugin';

gsap.registerPlugin(scrollTo, ScrollTrigger);
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  selectedTab: string = 'AboutKumar';
  corporateProfileAnimationInstance: any;
  corporateProfileAnimationInstance2: any;
  tlIndex: string = '1966';
  tlIndex1: string = '1975';
  tlIndex2: string = '1979';
  tlImages: any = {
    1966: {
      url: 'assets/timeline/Kumar-Properties-Logo_about-corp.jpg',
      title: 'Founded by Mr. K.H. Oswal',
    },
    1975: {
      url: 'assets/timeline/1975_Timeline.jpg',
      title: 'Ventured to build branded apartments',
    },
    1979: {
      url: 'assets/timeline/2008_Timeline.jpg',
      title: 'Became expert in residential buildings',
    },
    1986: {
      url: 'assets/timeline/1986_Timeline.jpg',
      title: 'Constructed multiple bungalow projects',
    },
    1992: {
      url: 'assets/timeline/1992_Timeline.jpg',
      title:
        'Built luxurious mega residential complexes and created and identity',
    },
    1995: {
      url: 'assets/timeline/1995_Timeline.jpg',
      title: 'Diversified to build IT parks & commercial buildings',
    },
    2008: {
      url: 'assets/timeline/1979_Timeline.jpg',
      title: 'Took a drastic plunge and built mega townships',
    },
    2019: {
      url: 'assets/timeline/2019_Timeline.jpg',
      title: 'Introduction to innovative construction technology',
    },
    2023: {
      url: 'assets/timeline/2023_Timeline.png',
      title: 'Rebranding as Kumar Corp',
    },
  };

  dates: number[] = [1966, 1975, 1979, 1986, 1992, 1995, 2008, 2019, 2023];
  selectTab(tab: string) {
    this.selectedTab = tab;
    if (this.selectedTab == 'AboutKumar') {
      setTimeout(() => {
        gsap.from('.container1', {
          y: '100%',
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.limitless-sky', {
          y: '100%',
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        ScrollTrigger.refresh(true);
      }, 0);
    } else if (this.selectedTab == 'corporateProfile') {
      setTimeout(() => {
        gsap.from('.corporateImg img', {
          y: '-100%',
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.leftPartImg img', {
          y: '100%',
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });

        gsap.from('.leftTextPara', {
          scrollTrigger: {
            trigger: '.corporateProfile-wrapper',
            toggleActions: 'play none reverse none',
            // scrub: true,

            start: '40% 70%',
            end: 'center center',
          },
          y: '100%',
          delay: 0,
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.rightPartImg img', {
          scrollTrigger: {
            trigger: '.corporateProfile-wrapper',
            toggleActions: 'play none reverse none',
            // scrub: true,

            start: '40% 70%',
            end: 'center -60%',
          },
          y: '100%',
          delay: 0,
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.rightText p', {
          scrollTrigger: {
            trigger: '.corporateProfile-wrapper',
            toggleActions: 'play none reverse none',
            // scrub: true,

            start: '40% 80%',
            end: 'center -60%',
          },
          y: '100%',
          delay: 0,
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.TextSectionPara', {
          scrollTrigger: {
            trigger: '.RealEstatemarket',
            toggleActions: 'play none reverse none',
            // scrub: true,

            start: '40% 80%',
            end: 'center -60%',
          },
          y: '100%',
          delay: 0,
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        gsap.from('.RealEstatemarket img', {
          scrollTrigger: {
            trigger: '.RealEstatemarket',
            toggleActions: 'play none reverse none',
            // scrub: true,

            start: '40% 80%',
            end: 'center -60%',
          },
          y: '100%',
          delay: 0,
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });
        setTimeout(() => {
          // ScrollTrigger.refresh();
        }, 1000);
      }, 0);
    } else if (this.selectedTab == 'DirectorsPage') {
      setTimeout(() => {
        gsap.from('.directorOnlyDesk', {
          opacity: 0,
          duration: 1.5,
          ease: 'power1.out',
        });
        gsap.from('.animate', {
          y: '100%',
          opacity: 0,
          duration: 1.8,
          ease: 'power1.out',
        });

        gsap.from('.animate-names p', {
          y: '100%',
          opacity: 0,
          delay: 0.5,
          duration: 0.9,
          ease: 'power1.out',
        });

        gsap.from('.firstHeadding span', {
          scrollTrigger: {
            trigger: '.STEELINHISVEINS',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 70%',
            end: 'center 50%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.from('.mainSteelImg img', {
          scrollTrigger: {
            trigger: '.STEELINHISVEINS',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 70%',
            end: 'center 50%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.animate-steelText p', {
          scrollTrigger: {
            trigger: '.SteelContainer',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 70%',
            end: 'center -50%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.from('.img2Steel img', {
          scrollTrigger: {
            trigger: '.rotateReverse',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 45%',
            end: 'center -30%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.text2Steel span', {
          scrollTrigger: {
            trigger: '.rotateReverse',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 60%',
            end: 'center -30%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.steel2Small img', {
          scrollTrigger: {
            trigger: '.experience-container',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 40%',
            end: 'center -60%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.animate-experience span', {
          scrollTrigger: {
            trigger: '.experience-container',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 60%',
            end: 'center -50%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.from('.text1 span', {
          scrollTrigger: {
            trigger: '.animate-lastsec',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 65%',
            end: 'bottom top',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.rightSection img', {
          scrollTrigger: {
            trigger: '.animate-lastsec',
            toggleActions: 'restart pause complete reset',
            // scrub: true,
            start: 'top 60%',
            end: 'center -60%',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });

        gsap.from('.text2 span', {
          scrollTrigger: {
            trigger: '.animate-lastsec',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 55%',
            end: 'bottom top',
          },
          y: '70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.from('.middleImg img', {
          scrollTrigger: {
            trigger: '.animate-lastsec',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 65%',
            end: 'bottom top',
          },
          x: '-70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
        gsap.from('.middleImg img', {
          scrollTrigger: {
            trigger: '.animate-lastsec',
            toggleActions: 'restart pause complete reset',
            // scrub: true,

            start: 'top 65%',
            end: 'bottom top',
          },
          x: '-70%',

          opacity: 0,

          duration: 1.2,
          ease: 'power1.out',
        });
      }, 0);
    }
  }

  // toggleAccordion(event: MouseEvent) {
  //     const element = event.currentTarget as HTMLElement;
  //     element.classList.toggle('active');
  //     console.log(element);
  //   }

  ngAfterViewInit() {
    gsap.from('.Ammenties ul', {
      y: '-100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });

    gsap.from('.container1', {
      y: '100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });
    gsap.from('.limitless-sky', {
      y: '100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });

    gsap.from('.leftWEbelieve h1', {
      y: '200%',
      duration: 1.8,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.web',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        // scrub: true,
        // pin: true,
        start: 'top 70%',
        end: '50% top',
      },
    });

    gsap.from('.about-desc p', {
      scrollTrigger: {
        trigger: '.web',
        toggleActions: 'restart pause complete reset',
        start: 'top 70%',
        end: '50% top',
      },
      y: '100%',
      duration: 1.8,
      ease: 'power1.out',
      delay: 0.3,
    });

    gsap.from('.RightText2 p', {
      scrollTrigger: {
        trigger: '.web',
        toggleActions: 'restart pause complete reset',
        start: 'top 20%',
      },
      y: '100%',
      delay: 1,
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });
    try {
      setTimeout(() => {
        let years = document.querySelector('.dates-picker');
        const headings = gsap.utils.toArray('.dates-picker p');
        let cImg = gsap.from('.imgCarousel img', {
          y: '100%',
          duration: 1,
          opacity: 0,
          ease: 'power1.out',
        });
        let cImgRev = gsap.from('.imgCarousel .images', {
          y: '-100%',
          duration: 1,
          opacity: 0,
          ease: 'power1.out',
        });

        let cText = gsap.from('.imgText .text-wrapper', {
          y: '100%',
          duration: 1.5,
          opacity: 0,
          ease: 'power1.out',
        });
        let cTextRev = gsap.from('.marq-text', {
          y: '-100%',
          duration: 1.5,
          opacity: 0,
          ease: 'power1.out',
        });

        let cDate = gsap.from('.clean-date', {
          y: '10%',
          duration: 1.2,
          opacity: 0,
          ease: 'power1.out',
        });
        let cDateRev = gsap.from('.clean-date p', {
          y: '-60%',
          duration: 1.2,
          opacity: 0,
          ease: 'power1.out',
        });
        headings.forEach((title: any, i: number) => {
          gsap.to(title, {
            scrollTo: { y: (headings as any)[i].offsetTop, autoKill: false },
            scrollTrigger: {
              trigger: title,
              start: 'top center',
              end: '+=800 bottom',
              scrub: 1,
              onEnter: () => {
                console.log(title.innerText, 'updated year');
                window.document.body.style.overflow = 'hidden';
                window.scrollTo(0, window.scrollY + 600);
                setTimeout(() => {
                  window.document.body.style.overflow = 'unset';
                }, 1000);
                this.tlIndex = title.innerText;
                if (this.tlIndex != '1966' && this.tlIndex != '2023') {
                  cDate.restart();
                  cImg.restart();
                  cText.restart();
                }
                // this.tlIndex1 = String(this.dates[this.dates.findIndex((x: number) => String(x) == this.tlIndex) + 1] || "fin")
                // this.tlIndex2 = String(this.dates[this.dates.findIndex((x: number) => String(x) == this.tlIndex) + 2] || "fin")
              },
              onLeaveBack: () => {},
              onEnterBack: () => {
                console.log('About you');
                window.document.body.style.overflow = 'hidden';
                window.scrollTo(0, window.scrollY - 100);
                setTimeout(() => {
                  window.document.body.style.overflow = 'unset';
                }, 1000);
                console.log(title.innerText, 'updated year');
                this.tlIndex = title.innerText;
                if (this.tlIndex != '1966' && this.tlIndex != '2023') {
                  cDateRev.restart();
                  cImgRev.restart();
                  cTextRev.restart();
                }
                this.tlIndex1 = String(
                  this.dates[
                    this.dates.findIndex(
                      (x: number) => String(x) == this.tlIndex
                    ) + 1
                  ] || 'fin'
                );
                this.tlIndex2 = String(
                  this.dates[
                    this.dates.findIndex(
                      (x: number) => String(x) == this.tlIndex
                    ) + 2
                  ] || 'fin'
                );
              },
              toggleClass: 'title-selected',
            },
          });
        });

        gsap.to(years, {
          y: 470 - (years as any).clientHeight - 30,
          ease: 'none', // <-- IMPORTANT!
          scrollTrigger: {
            trigger: '.TimeLine',
            pin: '.TimeLine',
            scrub: 1,
            start: 'top top',
            end: '+8000px',
          },
        });
        ScrollTrigger.refresh(true);
      }, 200);
    } catch (error) {
      console.log('not about k');
    }

    gsap.from('.img1 img', {
      scrollTrigger: {
        trigger: '.web',
        toggleActions: 'restart pause complete pause',
        start: 'top 20%',
      },

      y: '100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });
    gsap.from('.img2 img', {
      scrollTrigger: {
        trigger: '.web',
        toggleActions: 'restart pause complete pause',
        start: 'top 50%',
      },
      y: '100%',
      opacity: 0,
      duration: 1.8,
      ease: 'power1.out',
    });

    gsap.from('.brandPromise h1', {
      y: '100%',
      duration: 1.5,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.brandPromise',
        toggleActions: 'restart pause complete reset',
        start: 9500,
        end: '+=9800',
      },
    });

    gsap.from('.brandText p', {
      y: '100%',
      duration: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.brandPromise',
        toggleActions: 'restart pause complete reset',
        start: 9500,
        end: '+=9800',
      },
    });
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1500);
  }
  activeImage: string = 'assets/about-us/vision.png';
  accordionItems: any[] = [
    {
      question: 'Vision',
      answer:
        'To set new standards of excellence in the service of providing top quality living, working and business spaces. To maintain leadership through innovation in the field of design, technology and quality.',
      isOpen: false,
      image: 'assets/about-us/vision.png',
    },
    {
      question: 'Mission',
      answer:
        '<p>Total customer satisfaction.</p> <br/> <p>Trust and reliability.</p><br/> <p>Respect for the environment.</p> ',
      isOpen: false,
      image: 'assets/about-us/mission.png',
    },
    {
      question: 'Quality Assurance',
      answer:
        '<p>Reputation and trust are the building blocks of long term success in the construction industry. Assuring our customers ‘good quality’ is, not just a business policy, but a business philosophy, with us at Kumar Properties.</p> <p>We follow stringent quality control norms Vis-a Vis every business activity from procurement to delivery. Only laboratory certified concrete and best quality construction material are used. Qualified engineers and architects, trained site personnel, strict adherence to schedules and meticulous paper-work are the hall-marks of all our projects.</p> <p> It is small wonder that customers have put their complete trust in us for over fifty years, and continue to do so with full confidence.</p>',
      isOpen: false,
      image: 'assets/about-us/qa.png',
    },
  ];

  toggleAccordion(item: any) {
    // Close all accordion items except the clicked one
    this.accordionItems.forEach((accordionItem) => {
      if (accordionItem !== item) {
        console.log('logging out');
        accordionItem.isOpen = false;
      }
    });
    this.activeImage = item.image;

    // Toggle the clicked accordion item
    item.isOpen = !item.isOpen;
  }

  activeDate: number | null = null;

  isActive(date: number): boolean {
    return this.activeDate === date;
  }

  setActive(date: number): void {
    this.activeDate = date;
  }

  ngOnDestroy() {
    ScrollTrigger.killAll();
  }
}
