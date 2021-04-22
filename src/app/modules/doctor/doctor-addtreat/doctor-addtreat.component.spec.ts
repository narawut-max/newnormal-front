import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddtreatComponent } from './doctor-addtreat.component';

describe('DoctorAddtreatComponent', () => {
  let component: DoctorAddtreatComponent;
  let fixture: ComponentFixture<DoctorAddtreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddtreatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddtreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
