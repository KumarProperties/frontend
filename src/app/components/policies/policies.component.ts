import { Component } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css'],
})
export class PoliciesComponent {
  selectedTab: string = 'privacyPolicy';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
