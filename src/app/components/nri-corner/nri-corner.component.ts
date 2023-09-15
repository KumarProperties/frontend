import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-nri-corner',
  templateUrl: './nri-corner.component.html',
  styleUrls: ['./nri-corner.component.css'],
})
export class NriCornerComponent {
  ngAfterViewInit() {
    gsap.from('.heading span', {
      y: '100%',
      duration: 1.8,
    });
    gsap.from('.title span', {
      y: '100%',
      duration: 1,
      delay: 0.5,
    });
    gsap.from('.firstPara span', {
      y: '100%',
      duration: 1.8,
      delay: 0.2,
    });
    gsap.from('.animateImg img', {
      y: '100%',
      duration: 1.8,
    });
    gsap.from('.textImg img', {
      scrollTrigger: {
        trigger: '.sec2',
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

    gsap.from('.animate-pointertitle span', {
      scrollTrigger: {
        trigger: '.sec2',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });

    gsap.from('.animatePara1 span', {
      scrollTrigger: {
        trigger: '.sec2',
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
    gsap.from('.textImg2 img', {
      scrollTrigger: {
        trigger: '.sec3',
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
    gsap.from('.animate-pointertitle2 span', {
      scrollTrigger: {
        trigger: '.sec3',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });

    gsap.from('.animatePara2 span', {
      scrollTrigger: {
        trigger: '.sec3',
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
    gsap.from('.animate-bottomTitle span', {
      scrollTrigger: {
        trigger: '.sec4',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });
    gsap.from('.bottomText .para1', {
      scrollTrigger: {
        trigger: '.sec4',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });
    gsap.from('.bottomText .para2', {
      scrollTrigger: {
        trigger: '.sec4',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '100%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });
    gsap.from('.bottomImg img', {
      scrollTrigger: {
        trigger: '.sec4',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 70%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.5,
      ease: 'power1.out',
    });
    gsap.from('.animate-contact span', {
      scrollTrigger: {
        trigger: '.sec5',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 80%',
        end: 'center -50%',
      },
      y: '90%',

      opacity: 1,

      duration: 1.2,
      ease: 'power1.out',
    });
    gsap.from('.animate-email span', {
      scrollTrigger: {
        trigger: '.sec5',
        toggleActions: 'restart pause complete reset',
        // scrub: true,

        start: 'top 80%',
        end: 'center -50%',
      },
      y: '70%',

      opacity: 0,

      duration: 1.2,
      ease: 'power1.out',
    });
  }
}
