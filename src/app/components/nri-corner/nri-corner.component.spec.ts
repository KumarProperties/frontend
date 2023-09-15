import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NriCornerComponent } from './nri-corner.component';

describe('NriCornerComponent', () => {
  let component: NriCornerComponent;
  let fixture: ComponentFixture<NriCornerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NriCornerComponent]
    });
    fixture = TestBed.createComponent(NriCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
