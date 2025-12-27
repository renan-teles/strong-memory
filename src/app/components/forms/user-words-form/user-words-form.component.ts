import { CommonModule } from '@angular/common';
import { Component, effect, inject, Input, input, output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators,} from '@angular/forms';
import { GameService } from '../../../services/game/game.service';
import { WordInputComponent } from '../inputs/word-input/word-input.component';
import { IWordComparator } from '../../../shared/word-comparator.interface';

@Component({
  selector: 'app-user-words-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, WordInputComponent],
  templateUrl: './user-words-form.component.html',
  styleUrl: './user-words-form.component.css',
})
export class UserWordsFormComponent implements IWordComparator{
  @Input({ required: true }) title!: string;

  numberInputs = input.required<number>();
  compare = input<boolean>(false);

  submitWords = output<string[]>();
  showButton!: boolean;

  private readonly game = inject(GameService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    words: this.fb.nonNullable.array<FormControl<string>>([]),
  });
  
  get wordsArray(): FormArray<FormControl<string>> {
    return this.form.controls.words;
  }
  
  constructor() {
    effect(() => this.buildForm(this.numberInputs()));
  }

  private buildForm(total: number): void {
    this.wordsArray.clear();

    for (let i = 0; i < total; i++) {
      this.wordsArray.push(
        this.fb.nonNullable.control('', Validators.required)
      );
    }

    this.showButton = true;
  }

  equalWordsByIndex(index: number): boolean {
    return this.game.compareCurrentWordsAndUserWordsByIndex(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.showButton = false;
    this.wordsArray.disable();
    this.submitWords.emit(this.form.getRawValue().words);
  }
}
