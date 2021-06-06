import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagebookingComponent } from './user-managebooking.component';

describe('UserManagebookingComponent', () => {
  let component: UserManagebookingComponent;
  let fixture: ComponentFixture<UserManagebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
