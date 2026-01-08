import { TestBed } from '@angular/core/testing';

import { WordCategoryService } from './word-category.service';

describe('WordCategoryService', () => {
  let service: WordCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
