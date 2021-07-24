import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingCalenderComponent } from './user-booking-calender.component';

describe('UserBookingCalenderComponent', () => {
  let component: UserBookingCalenderComponent;
  let fixture: ComponentFixture<UserBookingCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
