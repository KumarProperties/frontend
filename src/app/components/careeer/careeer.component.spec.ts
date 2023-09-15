import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareeerComponent } from './careeer.component';

describe('CareeerComponent', () => {
  let component: CareeerComponent;
  let fixture: ComponentFixture<CareeerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareeerComponent]
    });
    fixture = TestBed.createComponent(CareeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
