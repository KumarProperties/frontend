import { Component, ElementRef, ViewChild } from '@angular/core';

import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swal from 'sweetalert2';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ModalService } from 'src/app/modal-service.service';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { YtPlayerService } from 'src/app/services/yt-player.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce } from 'lodash';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private propertySwiper: Swiper | null = null;
  isLoaded: boolean = true;
  index: number = 1;
  testimonialsData: any = [];
  testimonialVideos: any = [];
  blogs: any = [];
  propSwiperIndex: number = 1;
  public slideNumber = 1;
  projects: any = [];
  leadData: FormGroup = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
  });
  constructor(
    private modalService: ModalService,
    public sanitizer: DomSanitizer,
    private route: Router,
    private apiService: ApiService,
    private ytPlayerService: YtPlayerService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      { name: 'Project', value: 'Home page' },
      { name: 'Keyword', value: ' 2 & 3 bhk flats pune' },
      {
        name: 'Title',
        value: ' Kumar Corp | Builders in Pune | Real estate developers',
      },
      {
        name: 'Description',
        value:
          'Kumar Corp - Top builders in Pune for commercial - residential properties. 135+ projects, 40,000 happy customers, 32 million sq ft delivered.',
      },
    ]);
  }
  @ViewChild('youtubePlayer', { read: YouTubePlayer })
  youtubePlayer!: YouTubePlayer;
  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef;
  slides: any = [
    {
      image: 'assets/header/building.png',
      title: '57 years of ',
      subtitle: 'delivering',
      text: 'tailored Real estate Solutions',
    },
    {
      image: 'assets/home/carousal2.png',
      title: 'Luxury Living at   ',
      subtitle: 'its Finest',
      text: 'Explore Our High-End Properties',
    },
    {
      image: 'assets/projectDetail/projectDetail-building.png',
      title: 'Discover ',
      subtitle: 'Your Dream Community ',
      text: 'Explore Our High-End Properties',
    },
  ];

  Blogslide: any = [];

  activeSlide: any = {
    image: 'assets/header/building.png',
    title: '57 years of ',
    subtitle: 'delivering',
    text: 'tailored Real estate Solutions',
  };
  ngOnInit() {
    this.apiService.getAllBlogs().subscribe({
      next: ({ data }: any) => {
        console.log(data);
        this.Blogslide = data;
      },
    });
    this.apiService.getTrendingProjects().subscribe({
      next: ({ data }: any) => {
        this.projects = data;
        console.log(this.projects.apartments, 'trendingProjects');
        // let homeProjects = [
        //   'Kumar Prospera',
        //   'Kumar Prithvi',
        //   'Kumar Palm Springs',
        //   'Kumar Siddhachal',
        //   'Princetown Royal',
        //   'Kumar Parasmani',
        //   'Kumar Paradise',
        //   'Kumar Priyadarshan',
        //   'Kumar Parc Residences',
        //   'Kumar Park Infinia',
        // ];
        // this.projects = this.projects.filter((project: any) => {
        //   if (homeProjects.includes(project.title)) {
        //     return project;
        //   }
        // });
        setTimeout(() => {
          gsap.fromTo(
            '.animate-downword-image',
            {
              y: '200',
              opacity: '0',
            },
            {
              y: 0,
              opacity: '1',
              scrollTrigger: {
                trigger: '.animate-downword-image',
                start: '-200% 60%',
                end: '-20% 80%',
                scrub: 0.6,
              },
            }
          );
        }, 500);
      },
    });
  }

  ngAfterViewInit() {
    this.ytPlayerService.init(this.youtubePlayer);
    this.ytPlayerService.load('sdsd');
    this.youtubePlayer.error.subscribe({
      error: () => {
        console.log('errorrr');
      },
    });

    // this.loadVideoById(1);
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    this.apiService.getTestimonials().subscribe((res: any) => {
      this.testimonialsData = res.slice(0, 14);
      console.log(this.testimonialsData);
      // this.testimonialsData.forEach((vid: any) => {
      //   setTimeout(() => {
      //     console.log(vid.link, 'LINK');
      //     this.ytPlayerService.load(vid.link);
      //     this.youtubePlayer.error.subscribe(
      //       (error) => {
      //         // console.log(error, vid.link, 'has the error');
      //       },
      //       (err: any) => {
      //         console.log('REAL ERROR');
      //       }
      //     );
      //   }, 4000);
      // });

      this.testimonialsData.forEach((element: any) => {
        if (element.link != 'Iryn46Fh4oE')
          this.testimonialVideos.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' + element.link
            )
          );
      });
    });

    const swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      loop: true,
      speed: 3000,
      spaceBetween: 300,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      on: {
        slideChange: () => {
          const activeIndex = swiper.realIndex;
          this.activeSlide = this.slides[activeIndex];
          const carouselText = document.querySelector('.animate-carousel-text');
          gsap
            .timeline()
            .fromTo(
              carouselText,
              { x: -1000, opacity: 0.2 },
              {
                x: 0,
                opacity: 0.9,
                delay: -1.2,
                duration: 3,
                ease: 'power1.easeInOutQuad',
              }
            )
            .to(carouselText, { delay: 1.8, opacity: 0, duration: 3 });
          gsap.fromTo(
            this.activeSlide,
            { x: -5000, opacity: 0.5 },
            { x: 0, opacity: 1, delay: -2, duration: 5.5, ease: 'power1.out' }
          );
        },
      },
    });
    swiper.init();
    this.activeSlide = this.slides[0];
    const carouselText = document.querySelector('.animate-carousel-text');
    gsap
      .timeline()
      .fromTo(
        carouselText,
        { x: -1000, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: -1,
          duration: 3,
          ease: 'power1.easeInOutQuad',
        }
      )
      .to(carouselText, { opacity: 0.5, duration: 2 });

    const carouselSlide = document.querySelector('.slide-0');
    gsap.fromTo(
      carouselSlide,
      { x: -5000, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        delay: -2,
        duration: 5.5,
        ease: 'power1.easeInOutQuad',
      }
    );

    let newSwiper = new Swiper('.swiper-container-Blog', {
      modules: [Pagination, Navigation],
      spaceBetween: 20,
      cssMode: true,
      pagination: {
        el: '.swiper-pagination-1',
        clickable: true,
      },
      navigation: {
        nextEl: '.next-blog',
        prevEl: '.prev-blog',
      },
      breakpoints: {
        // when window width is >= 320px
        640: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        320: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
      },
    });
    let newSwiperVideo = new Swiper('.swiper-', {
      modules: [Pagination, Navigation],
      spaceBetween: 20,
      cssMode: true,
      pagination: {
        el: '.swiper-pagination-1',
        clickable: true,
      },
      navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
      },
      breakpoints: {
        // when window width is >= 320px
        640: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        320: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
      },
    });

    // properties swiper

    this.propertySwiper = new Swiper('.properties', {
      modules: [Pagination, Navigation],
      speed: 2260,
      spaceBetween: 20,
      // loop: true,
      // cssMode: true,
      pagination: {
        el: '.swiper-pagination-prop',
        clickable: true,
        type: 'fraction',

        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            ' <span>-</span> ' +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        },
      },
      navigation: {
        nextEl: '.next-prop',
        prevEl: '.prev-prop',
      },
      breakpoints: {
        // when window width is >= 320px
        767: {
          slidesPerView: 1,
        },
        280: {
          slidesPerView: 1,
        },
      },
    });

    this.propertySwiper.init();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.centerImg',
        start: '-50% 90%',
        end: 'bottom 100%',
        scrub: 0.5,
      },
    });
    gsap.from('.projectShowCaseCarousel .image1 img', {
      y: '100%',
      scrollTrigger: {
        trigger: '.projectShowCaseCarousel',
        start: 'top bottom',
        end: 'bottom 70%',
        snap: {
          snapTo: 'labels', // snap to the closest label in the timeline
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          ease: 'power1.inOut', // the ease of the snap animation ("power3" by default)
        },

        scrub: 1,
        toggleClass: 'hiddencarousel',
      },
    });
    gsap.from('.projectShowCaseCarousel .image2 img', {
      y: '150%',
      scrollTrigger: {
        trigger: '.projectShowCaseCarousel-wrapper',
        start: 'top 40%',
        end: 'top 40%',
        scrub: 1,
        toggleClass: 'hiddencarousel',
      },
      duration: 3,
      delay: 4,
    });

    tl.from('.scale-image', {
      scale: () => 2,
      duration: 2,
    });

    tl.fromTo(
      '.upword-Img-building',
      { y: 300, opacity: 0 },
      { y: 0, ease: 'power1.easeInOutQuad', opacity: 1, duration: 2 }
    );

    gsap.fromTo(
      '.animate-downword-image',
      {
        y: '200',
        opacity: '0',
      },
      {
        y: 0,
        opacity: '1',
        scrollTrigger: {
          trigger: '.animate-downword-image',
          start: '-200% 60%',
          end: '-20% 80%',
          scrub: 0.6,
        },
      }
    );

    tl.from(
      '.inner-text-animate',

      {
        y: ' 100%',
        opacity: '0',
        scrollTrigger: {
          trigger: '.inner-text-animate',
          start: 'top bottom',
          end: 'top 85%',
          scrub: 4,
        },
      }
    );

    gsap.fromTo(
      '.quality-Assurance',
      {
        y: '-300',
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: '.quality-Assurance',
          start: 'top bottom',
          end: 'center 25%',
          scrub: 4,
        },
      }
    );

    gsap.fromTo(
      '.Premium',
      {
        y: '10%',
      },
      {
        y: 0,

        scrollTrigger: {
          trigger: '.Premium',
          start: '50% 80%',
          end: '90%  90%',
          scrub: 5,
        },
      }
    );
    gsap.from('.animate-input', {
      y: '80%',
      scrollTrigger: {
        trigger: '.animate-input',
        start: 'top 80%',
        end: 'bottom 90%',
        scrub: 3,
      },
    });

    gsap.from('.contact-us-animate', {
      y: '80%',
      scrollTrigger: {
        trigger: '.contact-us-animate',
        start: 'top 80%',
        end: 'bottom 90%',
        scrub: 3,
      },
    });

    gsap.from('.lets-simplify-animate', {
      y: '50%',
      scrollTrigger: {
        trigger: '.lets-simplify-animate',
        start: 'top 90%',
        end: 'bottom 40%',
        scrub: 3,
        // markers:true
      },
    });

    gsap.from('.projects-animate', {
      x: '100%',
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.projects-animate',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1.5,
      },
    });

    gsap.from('.animate-customers-view-all', {
      x: '-30%',
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-customers-view-all',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: 5,
        // markers: true
      },
    });

    gsap.from('.animate-Blogs-view-all ', {
      x: '-30%',
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.animate-Blogs-view-all ',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: 5,
        // markers: true
      },
    });

    gsap.from('.swiper-container-Blog ', {
      x: '80%',
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.swiper-container-Blog ',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: 5,
        // markers: true
      },
    });

    gsap.from('.desktop-animate-blogs-headding', {
      y: '80%',
      scrollTrigger: {
        trigger: '.desktop-animate-blogs-headding',
        start: 'top 100%',
        end: 'bottom 70%',
        scrub: 1,
      },
    });

    gsap.from('.desktop-animate-lets-connect', {
      y: '80%',
      scrollTrigger: {
        trigger: '.desktop-animate-lets-connect',
        start: '-20% 100%',
        end: '-30% 70%',
        scrub: 1,
      },
    });

    gsap.from('.letsconnect-arrow ', {
      x: '-50%',
      opacity: 0,
      duration: 1,

      zIndex: 1,
      scrollTrigger: {
        trigger: '.letsconnect-arrow ',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: 5,
        // markers: true
      },
    });

    setTimeout(() => {
      gsap.from('.animate-words-from-customers-carousel ', {
        x: '80%',
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.animate-words-from-customers-carousel ',
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: 5,
        },
      });
      gsap.from('.animate-words-from-customers', {
        y: '70%',
        scrollTrigger: {
          trigger: '.animate-words-from-customers',
          start: 'top 90%',
          end: 'bottom 50%',
          scrub: 2,
          // markers:true
        },
      });
      gsap.from('.image-animate', {
        x: '-100%',
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.image-animate',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.6,
        },
      });
      gsap.from('.from-top-animate', {
        y: '-100%',
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.image-animate',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.6,
        },
      });

      gsap.from('.propertyDetail', {
        x: '-100%',
        opacity: 0,
        duration: 5,
        scrollTrigger: {
          trigger: '.image-animate',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.6,
        },
      });
    }, 700);
  }

  connect(): void {
    // console.log(this.leadData.value);
    if (this.leadData.valid) {
      this.leadData.reset();
      this.apiService.postQlead(this.leadData.value).subscribe({
        next: (val) => {
          Swal.fire({
            title: 'Success!',
            text: 'Thank you for sharing your contact details. Our representative will get back to you shortly! Know More about Our Other Projects',
            icon: 'success',
            confirmButtonColor: '#f27f0c',
            confirmButtonText: 'Projects',
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['/projects']);
            }
          });
        },
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the details!',
        confirmButtonColor: '#f27f0c',
        icon: 'error',
      });
    }
  }
  routeTo(where: string) {
    this.route.navigate(['/testimonials']);
  }
  ngOnDestroy() {
    ScrollTrigger.killAll();
  }
}
