import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WordValidationDirective } from '../../../../../../shared/directives/word-validation.directive';

@Component({
  selector: 'app-word-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WordValidationDirective],
  styleUrl: './word-input.component.css',
  templateUrl: './word-input.component.html',
})
export class WordInputComponent {
  @Input({required: true}) mode!: 'edit' | 'view';
  @Input() control: FormControl<any> | null = null;
  @Input() placeholder = '';
  @Input() value = '';

  compare = input<boolean>(false);
  isEqual = input<boolean>(false);
}
