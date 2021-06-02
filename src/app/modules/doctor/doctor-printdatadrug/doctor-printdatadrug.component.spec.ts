import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPrintdatadrugComponent } from './doctor-printdatadrug.component';

describe('DoctorPrintdatadrugComponent', () => {
  let component: DoctorPrintdatadrugComponent;
  let fixture: ComponentFixture<DoctorPrintdatadrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPrintdatadrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPrintdatadrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
