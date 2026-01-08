import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTimeLeftComponent } from './no-time-left.component';

describe('NoTimeLeftComponent', () => {
  let component: NoTimeLeftComponent;
  let fixture: ComponentFixture<NoTimeLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTimeLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTimeLeftComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
