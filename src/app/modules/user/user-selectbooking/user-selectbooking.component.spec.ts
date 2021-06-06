import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectbookingComponent } from './user-selectbooking.component';

describe('UserSelectbookingComponent', () => {
  let component: UserSelectbookingComponent;
  let fixture: ComponentFixture<UserSelectbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
