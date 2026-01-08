import { TestBed } from '@angular/core/testing';

import { GamePageFacade } from './game-page.facade';

describe('GamePageFacade', () => {
  let service: GamePageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePageFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
