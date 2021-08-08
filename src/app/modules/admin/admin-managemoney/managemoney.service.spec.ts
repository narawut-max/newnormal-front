import { TestBed } from '@angular/core/testing';

import { ManagemoneyService } from './managemoney.service';

describe('ManagemoneyService', () => {
  let service: ManagemoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagemoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
