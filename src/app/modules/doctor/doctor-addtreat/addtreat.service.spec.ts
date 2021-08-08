import { TestBed } from '@angular/core/testing';

import { AddtreatService } from './addtreat.service';

describe('AddtreatService', () => {
  let service: AddtreatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtreatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
