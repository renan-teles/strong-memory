import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundGameComponent } from './round-game.component';

describe('RoundGameComponent', () => {
  let component: RoundGameComponent;
  let fixture: ComponentFixture<RoundGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundGameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
