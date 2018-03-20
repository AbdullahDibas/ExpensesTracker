import { TestBed, inject } from '@angular/core/testing';

import { ExpensesDataService } from './expenses-data.service';

describe('ExpensesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpensesDataService]
    });
  });

  it('should be created', inject([ExpensesDataService], (service: ExpensesDataService) => {
    expect(service).toBeTruthy();
  }));
});
