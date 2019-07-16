import { TestBed } from '@angular/core/testing';

import { PointsTransactionService } from './points-transaction.service';

describe('PointsTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsTransactionService = TestBed.get(PointsTransactionService);
    expect(service).toBeTruthy();
  });
});
