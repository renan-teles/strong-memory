import { TestBed } from '@angular/core/testing';

import { ScoreFacade } from './score.facade';

describe('ScoreFacade', () => {
  let service: ScoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
