import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireComponent } from './enquire.component';

describe('EnquireComponent', () => {
  let component: EnquireComponent;
  let fixture: ComponentFixture<EnquireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnquireComponent]
    });
    fixture = TestBed.createComponent(EnquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
