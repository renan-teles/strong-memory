import { TestBed } from '@angular/core/testing';

import { RoundGameFacade } from './round-game.facade';

describe('RoundGameFacade', () => {
  let service: RoundGameFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundGameFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
