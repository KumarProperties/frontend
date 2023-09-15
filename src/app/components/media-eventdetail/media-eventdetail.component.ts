import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-media-eventdetail',
  templateUrl: './media-eventdetail.component.html',
  styleUrls: ['./media-eventdetail.component.css'],
})
export class MediaEventdetailComponent {
  constructor(private event: ApiService, private route: ActivatedRoute) {}
  eventData: any;
  id: string = '';
  ngOnInit() {
    console.log(this.route.snapshot.params['eventId']);
    this.id = this.route.snapshot.params['eventId'];
    console.log(this.id);
    this.event.getActivity(this.id).subscribe({
      next: ({ data }: any) => {
        this.eventData = data;
        console.log(this.eventData.date.start_date, 'dataaaaaaaaaaaaaaaaaa');
      },
    });
  }
}
