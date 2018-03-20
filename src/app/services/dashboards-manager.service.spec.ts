import { TestBed, inject } from '@angular/core/testing';

import { DashboardsManagerService } from './dashboards-manager.service';

describe('DashboardsManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardsManagerService]
    });
  });

  it('should be created', inject([DashboardsManagerService], (service: DashboardsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
