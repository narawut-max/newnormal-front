import { TestBed } from '@angular/core/testing';

import { AdminEdituserService } from './admin-edituser.service';

describe('AdminEdituserService', () => {
  let service: AdminEdituserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEdituserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
