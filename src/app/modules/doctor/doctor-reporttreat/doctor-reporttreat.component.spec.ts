import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReporttreatComponent } from './doctor-reporttreat.component';

describe('DoctorReporttreatComponent', () => {
  let component: DoctorReporttreatComponent;
  let fixture: ComponentFixture<DoctorReporttreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReporttreatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReporttreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
