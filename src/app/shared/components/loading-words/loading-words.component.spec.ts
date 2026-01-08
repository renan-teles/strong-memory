import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWordsComponent } from './loading-words.component';

describe('LoadingWordsComponent', () => {
  let component: LoadingWordsComponent;
  let fixture: ComponentFixture<LoadingWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingWordsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
