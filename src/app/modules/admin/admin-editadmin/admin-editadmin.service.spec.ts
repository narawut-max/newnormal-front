import { TestBed } from '@angular/core/testing';

import { AdminEditadminService } from './admin-editadmin.service';

describe('AdminEditadminService', () => {
  let service: AdminEditadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEditadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
