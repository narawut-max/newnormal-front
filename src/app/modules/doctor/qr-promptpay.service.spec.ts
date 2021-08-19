import { TestBed } from '@angular/core/testing';

import { QrPromptpayService } from './qr-promptpay.service';

describe('QrPromptpayService', () => {
  let service: QrPromptpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrPromptpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
