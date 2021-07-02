import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorManagedrugComponent } from './doctor-managedrug.component';

describe('DoctorManagedrugComponent', () => {
  let component: DoctorManagedrugComponent;
  let fixture: ComponentFixture<DoctorManagedrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorManagedrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorManagedrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
