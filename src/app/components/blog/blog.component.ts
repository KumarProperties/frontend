import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { gsap } from 'gsap';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  constructor(private blogs: ApiService, private route: ActivatedRoute) {}
  blogsData: any = [];

  ngOnInit() {
    // this.blogs.getBlogs().subscribe((res: any) => {
    //   this.blogsData = res;
    //   console.log(this.blogsData, 'Blogs Data');
    //   this.blogsData.forEach((element: any) => {});
    // });

    console.log(this.route.snapshot.params['blogId'], 'blogRouter');
    this.blogs.getBlogs(this.route.snapshot.params['blogId']).subscribe({
      next: ({ data }: any) => {
        this.blogsData = data[0];
        console.log(data, 'dataaaaaaaaaaaaaaaaaa');
      },
    });
  }

  ngAfterViewInit() {
    gsap.from('.title span', {
      y: '100%',
      duration: 1.6,
    });
    gsap.from('.animate-date', {
      y: '100%',
      delay: 0.5,
      duration: 1.3,
    });
    gsap.from('.animate-img img', {
      y: '100%',
      duration: 1.6,
    });

    gsap.from('.desc span', {
      scrollTrigger: {
        trigger: '.description',
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

    gsap.from('.content1 span', {
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

    gsap.from('.content1Img img', {
      scrollTrigger: {
        trigger: '.description',
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

    gsap.from('.content2Img img', {
      scrollTrigger: {
        trigger: '.content2Div',
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

    gsap.from('.content2 span', {
      scrollTrigger: {
        trigger: '.content2Div',
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
  }
}
