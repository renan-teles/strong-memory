import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WordCategoryService } from '../../../../services/word-category/word-category.service';
import { IWordCategory } from '../../../../model/word-category.model';

@Component({
  selector: 'app-start-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './start-form.component.html',
  styleUrl: './start-form.component.css',
})
export class StartFormComponent {
  @Output() category = new EventEmitter<string>();

  private readonly categoryService = inject(WordCategoryService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    category: ['all', Validators.required]
  });
  
  get categories(): IWordCategory[] {
    return this.categoryService.getAll();
  }
  
  onSubmit(): void{
    this.category.emit(this.form.value.category);
  }
}
