import { TestBed } from '@angular/core/testing';

import { InstantRewardsService } from './instant-rewards.service';

describe('InstantRewardsService', () => {
  let service: InstantRewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
