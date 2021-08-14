import { TestBed } from '@angular/core/testing';

import { DoctorAdddrugService } from './doctor-adddrug.service';

describe('DoctorAdddrugService', () => {
  let service: DoctorAdddrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAdddrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
