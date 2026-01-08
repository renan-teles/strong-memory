import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsGameComponent } from './words-game.component';

describe('WordsGameComponent', () => {
  let component: WordsGameComponent;
  let fixture: ComponentFixture<WordsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsGameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
