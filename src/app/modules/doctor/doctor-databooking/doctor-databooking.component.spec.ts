import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDatabookingComponent } from './doctor-databooking.component';

describe('DoctorDatabookingComponent', () => {
  let component: DoctorDatabookingComponent;
  let fixture: ComponentFixture<DoctorDatabookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDatabookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDatabookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
