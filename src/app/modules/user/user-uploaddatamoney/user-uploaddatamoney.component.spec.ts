import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploaddatamoneyComponent } from './user-uploaddatamoney.component';

describe('UserUploaddatamoneyComponent', () => {
  let component: UserUploaddatamoneyComponent;
  let fixture: ComponentFixture<UserUploaddatamoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUploaddatamoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUploaddatamoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
