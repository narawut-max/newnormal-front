import { TestBed } from '@angular/core/testing';

import { ManagredrugService } from './managredrug.service';

describe('ManagredrugService', () => {
  let service: ManagredrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagredrugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
