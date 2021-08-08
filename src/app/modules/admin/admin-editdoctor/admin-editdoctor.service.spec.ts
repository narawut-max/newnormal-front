import { TestBed } from '@angular/core/testing';

import { AdminEditdoctorService } from './admin-editdoctor.service';

describe('AdminEditdoctorService', () => {
  let service: AdminEditdoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEditdoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
