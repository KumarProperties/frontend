import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaEventdetailComponent } from './media-eventdetail.component';

describe('MediaEventdetailComponent', () => {
  let component: MediaEventdetailComponent;
  let fixture: ComponentFixture<MediaEventdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaEventdetailComponent]
    });
    fixture = TestBed.createComponent(MediaEventdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
