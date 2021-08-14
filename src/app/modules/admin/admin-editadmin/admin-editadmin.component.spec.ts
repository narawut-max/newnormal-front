import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditadminComponent } from './admin-editadmin.component';

describe('AdminEditadminComponent', () => {
  let component: AdminEditadminComponent;
  let fixture: ComponentFixture<AdminEditadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
