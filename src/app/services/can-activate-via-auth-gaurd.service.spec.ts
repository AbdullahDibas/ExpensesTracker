import { TestBed, inject } from '@angular/core/testing';

import { CanActivateViaAuthGaurdService } from './can-activate-via-auth-gaurd.service';

describe('CanActivateViaAuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaAuthGaurdService]
    });
  });

  it('should be created', inject([CanActivateViaAuthGaurdService], (service: CanActivateViaAuthGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
