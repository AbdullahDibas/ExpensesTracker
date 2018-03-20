import { TestBed, inject } from '@angular/core/testing';

import { ExpenseCategoryDataService } from './expense-category-data.service';

describe('ExpenseCategoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseCategoryDataService]
    });
  });

  it('should be created', inject([ExpenseCategoryDataService], (service: ExpenseCategoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
