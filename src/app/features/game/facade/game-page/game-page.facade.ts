import { inject, Injectable, signal } from '@angular/core';
import { RandomWordApiService } from '../../../../core/services/random-word-api/random-word-api.service';
import { IWordCategory } from '../../model/word-category.model';
import { IWord } from '../../model/word.model';
import { WordCategoryService } from '../../services/word-category/word-category.service';

@Injectable({
  providedIn: 'root',
})
export class GamePageFacade {
  private readonly api = inject(RandomWordApiService);
  private readonly categories = inject(WordCategoryService);

  private readonly WORDS_NUMBER = 25;

  readonly loadingWords = signal(false);
  readonly errorGetWords = signal(false);

  readonly words = signal<IWord[]>([]);

  loadWords(category: string | null): void{
    this.loadingWords.set(true);  

    if (!category) {
      this.setError();
      return;
    }

    const wordCategory: IWordCategory | null = this.categories.findByValue(category);
    if (!wordCategory) {
      this.setError();
      return;
    }
    
    this.api.getRandomWords(wordCategory.value, this.WORDS_NUMBER, wordCategory.language)
      .subscribe({
        next: (words) => {
          this.loadingWords.set(false);
          this.errorGetWords.set(false);
          this.words.set(words);
        },
        error: () => this.setError()
      });
  }

  private setError(): void{
    this.loadingWords.set(false);
    this.errorGetWords.set(true);
  }
}
