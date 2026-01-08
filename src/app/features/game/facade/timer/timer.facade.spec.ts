import { TestBed } from '@angular/core/testing';

import { TimerFacade } from './timer.facade';

describe('TimerFacade', () => {
  let service: TimerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
