import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagemoneyComponent } from './admin-managemoney.component';

describe('AdminManagemoneyComponent', () => {
  let component: AdminManagemoneyComponent;
  let fixture: ComponentFixture<AdminManagemoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManagemoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagemoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
