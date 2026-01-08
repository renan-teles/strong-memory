import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWordsFormComponent } from './user-words-form.component';

describe('UserWordsFormComponent', () => {
  let component: UserWordsFormComponent;
  let fixture: ComponentFixture<UserWordsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWordsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWordsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
