import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionsdetailComponent } from './exhibitionsdetail.component';

describe('ExhibitionsdetailComponent', () => {
  let component: ExhibitionsdetailComponent;
  let fixture: ComponentFixture<ExhibitionsdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExhibitionsdetailComponent]
    });
    fixture = TestBed.createComponent(ExhibitionsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
