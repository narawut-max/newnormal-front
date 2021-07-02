import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReportDatauserComponent } from './doctor-report-datauser.component';

describe('DoctorReportDatauserComponent', () => {
  let component: DoctorReportDatauserComponent;
  let fixture: ComponentFixture<DoctorReportDatauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReportDatauserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReportDatauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
