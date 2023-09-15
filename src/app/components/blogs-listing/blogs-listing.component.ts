import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-blogs-listing',
  templateUrl: './blogs-listing.component.html',
  styleUrls: ['./blogs-listing.component.css'],
})
export class BlogsListingComponent {
  constructor(private blogs: ApiService) { }

  blogsData: any = [];

  ngOnInit() {
    this.blogs.getAllBlogs().subscribe((res: any) => {
      this.blogsData = res.data;
      console.log(this.blogsData, 'Blogs Data');
      // this.blogsData.forEach((element: any) => {});
    });
  }
}
