import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdddrugComponent } from './doctor-adddrug.component';

describe('DoctorAdddrugComponent', () => {
  let component: DoctorAdddrugComponent;
  let fixture: ComponentFixture<DoctorAdddrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAdddrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAdddrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
