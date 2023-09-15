import { Component } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css'],
})
export class DisclaimerComponent {
  ngAfterViewInit() {
    gsap.from('.title span', {
      y: '100%',
      duration: 1.6,
    });
    gsap.from('.para1 p', {
      y: '110%',
      delay: 0.5,
      duration: 1.3,
    });
    gsap.from('.para2 p', {
      delay: 0.5,
      y: '110%',
      duration: 1.6,
    });
  }
}
