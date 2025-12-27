import { TestBed } from '@angular/core/testing';

import { RandomWordApiService } from './random-word-api.service';

describe('RandomWordApiService', () => {
  let service: RandomWordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
