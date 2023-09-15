import {
  Component,
  ɵɵsanitizeResourceUrl,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import Swiper from 'swiper';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalService } from 'src/app/modal-service.service';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent {
  paragraph: string = '';
  location: string = 'School';
  techStackParagraph: string = '';
  mapArray: any[] = [];
  storedArray: any[] = [];

  locationData: any = [];
  // const mapArray: map[] =[];
  selectedTab: string = 'walkthrough';
  sentencesArray: string[] = [];
  techStackArray: string[] = [];
  projectData: any = {
    maps: [],
    gallery_medias: [],
    apartment_document: [],
  };
  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  flat360video: SafeResourceUrl = '';
  liveVideo: SafeResourceUrl = '';
  mapSource: SafeResourceUrl = '';
  walkthroughVideo: SafeResourceUrl = '';
  modalImg: SafeResourceUrl = '';
  floorImg: SafeResourceUrl = '';
  tab_selected: string = '';
  scrolledPercentage: number = 0;
  isFormOpen: boolean = false;
  isdownloadClicked: boolean = false;
  formSubmissionStatus: boolean = false;
  projectBot: string = '';
  dataBot: string = '';
  srcBot: string =
    'https://www.kenyt.ai/botapp/ChatbotUI/dist/js/bot-loader.js';
  private script: any;

  // isFormSubmit = localStorage.getItem('isFormSubmitted');
  isFormSubmit = false;
  modalVisible = false;
  floorModalVisible = false;
  timer: any;

  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public sanitizer: DomSanitizer,
    private modalService: ModalService,
    private meta: Meta,
    private title: Title
  ) {
    this.subscription = this.apiService.formSubmitted$.subscribe((status) => {
      console.log(status, 'this has been called');
      if (status) {
        this.formSubmissionStatus = true;

        if (this.isdownloadClicked) {
          let url = localStorage['currentPdf'];
          this.download(url);
        }
      }
    });
  }

  // scroll 90% function: after 90% scroll form will open
  @Output() dataSent: EventEmitter<any> = new EventEmitter();
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    this.scrolledPercentage = (scrollPosition / totalHeight) * 100;
    if (
      this.scrolledPercentage >= 90 &&
      this.isFormOpen == false &&
      !this.formSubmissionStatus
    ) {
      this.modalService.open('COMMON_FORM');
      this.isFormOpen = true;
    }
  }

  // 40 sec timer : after 40 sec form will open
  resetTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if (!this.isFormOpen && !this.formSubmissionStatus) {
        this.modalService.open('COMMON_FORM');
        this.isFormOpen = true;
      }
    }, 40000);
  }

  ngOnInit() {
    this.resetTimer();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    console.log(this.route.snapshot.params['projectId'], 'router');
    this.apiService
      .getProject(this.route.snapshot.params['projectId'])
      .subscribe({
        next: ({ data }: any) => {
          this.projectData = data;
          this.projectData.title_image = this.projectData?.title_image.filter(
            (image: string) => image != ''
          );

          // meta tags code
          this.meta.addTags([
            { name: 'Project', value: this.projectData.meta_tags[0]?.tag },
            { name: 'Keyword', value: this.projectData.meta_tags[1]?.tag },
            {
              name: 'URL',
              value: this.projectData.meta_tags[2]?.tag,
            },
            {
              name: 'Title',
              value: this.projectData.meta_tags[3]?.tag,
            },
            {
              name: 'Description',
              value: this.projectData.meta_tags[4]?.tag,
            },
          ]);
          //
          const defaultChatBot = document.querySelector('#default-bot-script');
          const botInternalDiv1 = document.querySelector('#chatbox-container');
          const botInternalDiv2 = document.querySelector('#kenytChatBubble');
          const chatBubble = document.querySelector(
            'script[src="https://www.kenyt.ai/botapp/ChatbotUI/dist/js/chatbubble.js?v=43"]'
          );
          const botStyle = document.querySelector(
            'link[href="https://www.kenyt.ai/botapp/ChatbotUI/dist/css/chatbubble.css?v=43"]'
          );

          if (defaultChatBot) {
            defaultChatBot.remove();
          }
          if (botInternalDiv1 || botInternalDiv2 || chatBubble || botStyle) {
            botInternalDiv1?.remove();
            botInternalDiv2?.remove();
            chatBubble?.remove();
            botStyle?.remove();
          }
          console.log('removed bot');
          // logic for project specific bot

          this.projectBot = this.projectData.title;
          switch (this.projectBot) {
            case 'Kumar Paradise':
              this.dataBot = '23221307';
              break;
            case 'Kumar Priyadarshan':
              this.dataBot = '22565509';
              break;
            case 'Kumar Palm Springs':
              this.dataBot = 'Kumar_PalmspringTowers';
              break;
            case 'Kumar Prajwal':
              this.dataBot = 'Kumar_Prajwal';
              break;
            case 'Kumar Prospera':
              this.dataBot = 'Kumar_Prospera';
              break;
            case 'Kumar Park Infinia':
              this.dataBot = 'Kumar_ParkInfina';
              break;
            case 'Kumar Picasso':
              this.dataBot = 'Kumar_Picasso';
              break;
            case 'Kumar Primus':
              this.dataBot = 'Kumar_Primus';
              break;
            case 'Princetown Royal':
              this.dataBot = 'Kumar_PrincetownRoyal';
              break;
            case 'Princetown Tower':
              this.dataBot = 'Kumar_PrincetownTower';
              break;
            case 'Kumar Prithvi':
              this.dataBot = 'Kumar_Prithvi';

              break;
            case 'Hill View Residency':
              this.dataBot = 'Kumar_Properties';
              break;
            case 'Kumar Primavera':
              this.dataBot = '29155743';
              break;
            case 'Kumar Siddhachal':
              this.dataBot = 'Kumar_Siddhachal';
              break;
            case 'Kumar Peninsula':
              this.dataBot = '22565509';
              break;
            case 'Kumar Parasmani':
              this.dataBot = 'Kumar_Parasmani';
              break;
            default:
              this.dataBot = '24295193';
              break;
          }

          this.script = document.createElement('script');
          this.script.src = this.srcBot;
          this.script.setAttribute('type', 'text/javascript');
          this.script.setAttribute('data-bot', this.dataBot);
          document.body.appendChild(this.script);
          console.log('Added bot');

          console.log(data);
          this.flat360video = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.projectData.flat_view.flat_view_360
          );
          this.liveVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.projectData.flat_view.live_view
          );
          // localStorage.setItem('dropdownProject', this.projectData?.title);
          // console.log(localStorage.getItem('dropdownProject'), 'qwerty');
          const newTitle = this.projectData?.title;
          this.apiService.setTitle(newTitle);

          this.paragraph = this.projectData.description;
          this.sentencesArray = this.splitParagraphIntoSentences(
            this.paragraph
          );
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.projectData.location_in_map
          );
          this.walkthroughVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.projectData.flat_view.walk_through
          );

          if (this.projectData.flat_view.walk_through) {
            this.selectedTab = 'walkthrough';
          } else if (this.projectData.flat_view.flat_view_360) {
            this.selectedTab = 'flat360';
          } else {
            this.selectedTab = 'live';
          }
          this.tabSelected('ammenties');

          if (this.projectData?.flat_details?.amenities?.bulleting[0]) {
            this.tab_selected = 'ammenties';
          } else if (this.projectData?.flat_details?.specification?.bulleting) {
            this.tab_selected = 'flat360';
          } else {
            this.tab_selected = 'live';
          }

          this.techStackParagraph = this.projectData.tech_stack.description;
          this.techStackArray = this.splitParagraphIntoSentences(
            this.techStackParagraph
          );
          this.mapArray = this.projectData.maps;
          console.log(this.mapArray, 'mapppssssss');
          this.locationData = this.mapArray[0];
          this.location = this.mapArray[0]?.type;
          console.log(this.location, 'ertyuioijh');
          if (!this.projectData.flat_details.amenities.bulleting[0]) {
            this.tab_selected = 'flat360';
          } else {
            this.tab_selected = 'ammenties';
          }
          setTimeout(() => {
            let BlogSwiper = new Swiper('.swiper-container-Gallary', {
              modules: [Navigation, Pagination],
              slidesPerView: 2.8,
              spaceBetween: 3,
              loop: true,
              pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
              },
              navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              },
              breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                // // when window width is >= 480px
                // 480: {
                //   slidesPerView: 3,
                //   spaceBetween: 30
                // },
                // // when window width is >= 640px
                640: {
                  slidesPerView: 2.8,
                  spaceBetween: 3,
                },
              },
            });
          }, 0);

          //
          gsap.from('.carouselText h1', {
            y: '100%',
            opacity: 0,
            duration: 1.8,
            ease: 'power1.out',
          });
          gsap.from('.bannerText', {
            y: '100%',
            opacity: 0,
            duration: 2,
            ease: 'power1.out',
          });
          this.projectData?.tech_stack?.title &&
            setTimeout(() => {
              gsap.from('.DetailContainer h3', {
                scrollTrigger: {
                  trigger: '.ModernTechContainer',
                  toggleActions: 'restart pause complete reset',
                  // scrub: true,
                },
                start: 'top top',
                end: '+=200px',
                y: '100%',
                duration: 1.3,
                ease: 'power1.out',
              });
            }, 1000);

          setTimeout(() => {
            gsap.from('.titleSwiper', {
              x: '-100%',
              opacity: 0,
              duration: 1.8,
              ease: 'power1.out',
            });
          }, 0);

          gsap.from('.InDetail', {
            scrollTrigger: {
              trigger: '.ModernTechContainer ',
              toggleActions: 'restart pause complete reset',
            },
            start: 'top 70%',
            end: 'bottom',
            delay: 0.2,
            y: '150%',
            duration: 1.3,
            ease: 'power1.out',
          });

          gsap.from('.topImg img', {
            scrollTrigger: {
              trigger: '.ModernTechContainer',
              toggleActions: 'restart pause complete reset',
              // scrub: true,
              start: 'top 70%',
              end: 'bottom top',
            },
            delay: 1.5,
            y: '100%',
            duration: 1.2,
            ease: 'power1.out',
          });
          gsap.from('.mainImg img', {
            scrollTrigger: {
              trigger: '.ModernTechContainer',
              toggleActions: 'restart pause complete reset',
            },
            start: 'top 70%',
            end: 'bottom  top',
            delay: 1.5,
            y: '100%',
            duration: 1.3,
            ease: 'power1.out',
          });

          gsap.from('.mahaReraTitle', {
            scrollTrigger: {
              trigger: '.mahaReraDiv ',
              toggleActions: 'restart pause complete reset',
            },
            start: 'top 70%',
            end: '+=200px',
            delay: 0.5,
            y: '127%',
            duration: 1.2,
            ease: 'power1.out',
          });
          gsap.from('.mahaText', {
            scrollTrigger: {
              trigger: '.mahaReraDiv ',
              toggleActions: 'restart pause complete reset',
            },
            start: 'top 70%',
            end: '+=200px',
            delay: 0.5,
            y: '110%',
            duration: 1.2,
            ease: 'power1.out',
          });
          gsap.from('.qrDiv', {
            scrollTrigger: {
              trigger: '.mahaReraDiv ',
              toggleActions: 'restart pause complete reset',
            },
            start: 'top 80%',
            end: '+=200px',
            delay: 1.2,
            opacity: 0,
            duration: 1.2,
            ease: 'power1.out',
          });
          setTimeout(() => {
            gsap.from('.swiper-container-Gallary', {
              scrollTrigger: {
                trigger: '.GallaryCarousel ',
                toggleActions: 'restart pause complete reset',
                // scrub: 2,
              },
              start: 'top top',
              end: '+=200px',

              x: '200%',
              duration: 1.8,
              ease: 'power1.out',
            });
          }, 0);

          // gsap.from('.specImg img', {
          //   scrollTrigger: {
          //     trigger: '.ammentiesPositonsContainer',
          //     toggleActions: 'restart pause reverse reset',
          //     scrub: 1,
          //     start: 'top bottom',
          //     markers: true,
          //     end: '+=200 85%',
          //   },
          //   y: '100%',
          //   duration: 2,
          //   ease: 'power1.out',
          // });
          // gsap.from('.smallImg  img', {
          //   scrollTrigger: {
          //     trigger: '.ammentiesPositonsContainer',
          //     toggleActions: 'restart pause reverse reset',
          //     start: 'top bottom',
          //     markers: true,
          //     end: '+=200 85%',
          //     scrub: 1,
          //   },
          //   y: '200%',
          //   duration: 2,
          //   ease: 'power1.out',
          // });

          gsap.from('.details-wrapper', {
            scrollTrigger: {
              trigger: '.littleDetail',
              toggleActions: 'restart pause pause reset',
              // scrub: true,
              start: '0 80%',
              end: 'center top',
            },
            y: '60%',
            duration: 1,
            ease: 'power1.out',
          });
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 500);
        },
      });
    console.log(document.querySelector('swiper-container-Gallary'));

    // Assuming you have received the paragraph as a string from the API
  }

  ngAfterViewInit() {
    let newSwiper = new Swiper('.swiper-container', {
      spaceBetween: 60,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // // when window width is >= 480px
        // 480: {
        //   slidesPerView: 3,
        //   spaceBetween: 30
        // },
        // // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });

    let swiper = new Swiper('.titleSwiper', {
      modules: [Pagination, Autoplay],
      autoplay: true,

      slidesPerView: 1,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
  }

  ngOnDestroy() {
    const botInternalDiv1 = document.querySelector('#chatbox-container');
    const botInternalDiv2 = document.querySelector('#kenytChatBubble');
    const chatBubble = document.querySelector(
      'script[src="https://www.kenyt.ai/botapp/ChatbotUI/dist/js/chatbubble.js?v=43"]'
    );
    const botStyle = document.querySelector(
      'link[href="https://www.kenyt.ai/botapp/ChatbotUI/dist/css/chatbubble.css?v=43"]'
    );
    if (botInternalDiv1 || botInternalDiv2 || chatBubble || botStyle) {
      botInternalDiv1?.remove();
      botInternalDiv2?.remove();
      chatBubble?.remove();
      botStyle?.remove();
    }
    console.log('removed bot');

    const default_script = document.createElement('script');
    default_script.src = this.srcBot;
    default_script.id = 'default-bot-script';
    default_script.setAttribute('type', 'text/javascript');
    default_script.setAttribute('data-bot', '24295193');
    document.body.appendChild(default_script);

    clearTimeout(this.timer);
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    );

    if (this.script) {
      document.body.removeChild(this.script);
    }

    this.formSubmissionStatus = false;
    // this.subscription.unsubscribe();
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.resetTimer();
    } else {
      clearTimeout(this.timer);
    }
  };

  splitParagraphIntoSentences(paragraph: string): string[] {
    const sentenceRegex = /[.!?]/;
    return paragraph
      .split(sentenceRegex)
      .filter((sentence) => sentence.trim() !== '');
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  tabSelected(tab: string) {
    this.tab_selected = tab;

    if (this.tab_selected == 'live') {
      setTimeout(() => {
        let swiper = new Swiper('.floorPlan', {
          modules: [Pagination, Autoplay, Navigation],
          // autoplay: true,
          loop: true,
          slidesPerView: 1.4,
          spaceBetween: 0,

          // pagination: {
          //   el: '.swiper-pagination',
          // },
          navigation: {
            nextEl: '.swipe-next',
            prevEl: '.swipe-prev',
          },
        });
      }, 0);
    }

    if (this.tab_selected == 'flat360') {
      setTimeout(() => {
        gsap.from('.specImg img', {
          scrollTrigger: {
            trigger: '.ammentiesPositonsContainer',
            toggleActions: 'restart pause reverse reset',
            scrub: 1,
            start: 'top bottom',
            end: '+=200 85%',
          },
          y: '150%',
          duration: 2,
          ease: 'power1.out',
        });
        gsap.from('.specImg2 img', {
          scrollTrigger: {
            trigger: '.ammentiesPositonsContainer',
            toggleActions: 'restart pause reverse reset',
            scrub: 1,
            start: 'top bottom',
            end: '+=200 85%',
          },
          y: '150%',
          delay: 2,
          duration: 2,
          ease: 'power1.out',
        });
      }, 0);
    }
    console.log('================================', this.tab_selected);
    if (this.tab_selected == 'ammenties') {
      console.log('initialized amen');
      setTimeout(() => {
        let swiper = new Swiper('.amenities-swiper', {
          modules: [Pagination, Autoplay, Navigation],
          // autoplay: true,

          slidesPerView: 1,
          spaceBetween: 50,
          grabCursor: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.swipe-next',
            prevEl: '.swipe-prev',
          },
          observer: true,
          observeParents: true,
        });

        gsap.from('.accordion-main-img img', {
          scrollTrigger: {
            trigger: '.ammentiesPositonsContainer',
            toggleActions: 'restart pause reverse reset',
            scrub: 1,
            start: 'top bottom',

            end: '+=200 85%',
          },
          y: '100%',
          duration: 2,
          ease: 'power1.out',
        });
        gsap.from('.ammenImg2 img', {
          scrollTrigger: {
            trigger: '.ammentiesPositonsContainer',
            toggleActions: 'restart pause reverse reset',
            scrub: 1,
            start: 'top bottom',
            end: '+=200 85%',
          },
          y: '100%',
          delay: 2,
          duration: 2,
          ease: 'power1.out',
        });
      }, 500);
    }
  }
  // Accordian
  faqItems = [
    {
      label: 'club House',
      content: [
        'Gymnasium',
        'Multipurpose Hall',
        'Swimming Pool with Kids Pool and Pool Deck Area',
        'Table Tennis',
        'Indoor Games Room',
        'Swimming Pool Change Rooms.',
      ],
      show: false,
    },
    {
      label:
        ' Outdoor Party Lawn Area along with pantry and open-air Food court',
      content: [
        'Quo natus nisi ea nostrum reiciendis non dolorum rerum est recusandae reiciendis. Qui sunt consectetur eos quisquam voluptate aut esse vitae aut veniam optio ut ducimus tenetur. Hic consequuntur modi eum enim beatae ut officia molestiae. Hic nostrum iusto 33 vero libero sit reiciendis culpa.',
        'Lorem ipsum dolor sit amet. Sit dignissimos officia et beatae quia qui veritatis consequatur et eaque eius non sequi accusamus sed quasi voluptatem est dolor laborum. Sit quos explicabo qui aliquid natus ut laborum placeat.',
      ],
      show: true,
    },
    // Add more FAQ items as needed
  ];

  toggleFaqItem(item: any) {
    item.show = !item.show;
  }

  ngAfterviewInit() {}
  dynamicMapSource(mapImage: SafeResourceUrl) {
    this.mapSource = mapImage;
  }

  modalImgSource(modalImg: SafeResourceUrl) {
    this.modalVisible = true;

    let modalSwiper = new Swiper('.modal-swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 50,
        },

        640: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      },
    });
    const selectedImgIndex = this.projectData.gallery_medias.indexOf(modalImg);
    this.modalImg = modalImg;
    modalSwiper.slideTo(selectedImgIndex, 0);
  }
  modalFloorSource(floorImg: SafeResourceUrl) {
    this.floorModalVisible = true;

    let floorSwiper = new Swiper('.floor-swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 50,
        },

        640: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      },
    });
    console.log(
      floorImg,
      'new media',
      this.projectData.flat_details.isometric_view.media
    );
    const selectedImgIndex =
      this.projectData.flat_details.isometric_view.media.indexOf(floorImg);
    this.floorImg = floorImg;
    floorSwiper.slideTo(selectedImgIndex, 0);
  }

  mapLocation(loc: string) {
    this.location = loc;
    console.log(this.location);
    for (const item of this.mapArray) {
      if (this.location == item.type) {
        this.locationData = item;
        console.log(this.locationData, 'my itemmm');
      }
    }
  }

  download(url: string) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    console.log(url, 'hjkdfghj');
    // the filename you want
    a.target = '_blank';
    a.download = 'kumarproperties.pdf';
    document.body.appendChild(a);
    a.click();
  }
  isFormSubmitted(url: string) {
    const storedArrayString = localStorage.getItem('isProjectInclude');

    if (storedArrayString) {
      this.storedArray = JSON.parse(storedArrayString);
      console.log(this.storedArray, 'isProjectInclude');
    }
    this.isdownloadClicked = true;
    console.log(this.formSubmissionStatus, 'formSubmissionStatus');
    localStorage['currentPdf'] = url;
    if (
      this.formSubmissionStatus &&
      this.storedArray.includes(this.projectData.title)
    ) {
      this.download(url);
    } else {
      this.modalService.open('COMMON_FORM');
      // if (localStorage.getItem('isFormSubmitted') == 'true') {
      //   this.download(url);
      // }
    }
  }

  open(url: string) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.target = '_blank';
    a.download = 'kumarproperties.pdf';
    document.body.appendChild(a);
    a.click();
  }
}
