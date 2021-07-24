import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEdituserComponent } from './admin-edituser.component';

describe('AdminEdituserComponent', () => {
  let component: AdminEdituserComponent;
  let fixture: ComponentFixture<AdminEdituserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEdituserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
