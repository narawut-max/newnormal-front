import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTreatComponent } from './doctor-treat.component';

describe('DoctorTreatComponent', () => {
  let component: DoctorTreatComponent;
  let fixture: ComponentFixture<DoctorTreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTreatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
