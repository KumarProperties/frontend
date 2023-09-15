import { Component } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  toggleMapPune: boolean = true;
  toggleMapMumbai: boolean = false;
  toggleMapBengaluru: boolean = false;
  mapSource: string =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.420564070867!2d73.87750301489261!3d18.509887587415214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c048315faa71%3A0x65309a306dbc433b!2sKumar%20Properties%20-%20Corporate%20Office!5e0!3m2!1sen!2sin!4v1690770701170!5m2!1sen!2sin';
  ngOnInit() {}
  share(url: string) {
    navigator.share({
      title: 'Kumar Properties',
      text: 'Discover Your Dream Community',
      url: url,
    });
  }
  getLocation(url: string) {
    window.open(url);
  }

  toggleAccordion(location: string) {
    console.log('clickedddd');
    if (location == 'pune') {
      this.toggleMapPune = true;
      this.toggleMapMumbai = false;
      this.toggleMapBengaluru = false;
    } else if (location == 'mumbai') {
      this.toggleMapPune = false;
      this.toggleMapMumbai = true;
      this.toggleMapBengaluru = false;
    } else if (location == 'bengaluru') {
      this.toggleMapPune = false;
      this.toggleMapMumbai = false;
      this.toggleMapBengaluru = true;
    }
  }
}
