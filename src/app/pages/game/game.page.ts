import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RandomWordApiService } from '../../services/random-word-api/random-word-api.service';
import { IWord } from '../../model/word.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordCategoryService } from '../../services/word-category/word-category.service';
import { SoundService } from '../../services/sound/sound.service';
import { GameComponent } from '../../components/game/game.component';
import { IWordCategory } from '../../model/word-category.model';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, GameComponent, RouterLink],
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit, OnDestroy {
  private readonly currentRoute = inject(ActivatedRoute);
  private readonly api = inject(RandomWordApiService);
  private readonly categories = inject(WordCategoryService);
  private readonly sounds = inject(SoundService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly WORDS_NUMBER = 25;

  readonly pageState = signal<'loading' | 'error' | 'show-game'>('loading');
  words: IWord[] = [];

  ngOnInit(): void{
    this.currentRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const category = params.get('wc');
        category ? this.loadWords(category) : this.error();
      });
  }

  ngOnDestroy(): void {
    this.sounds.stopAllSounds();
  }

  private loadWords(category: string): void {
    const wc: IWordCategory | null = this.categories.findByValue(category);
    if (!wc) return this.error();

    this.api.getRandomWords(
      wc.value, 
      this.WORDS_NUMBER, 
      wc.language
    )
    .subscribe({
      next: words => this.start(words),
      error: () => this.error()
    });
  }

  private start(words: IWord[]): void{
    this.words = words;
    this.pageState.set('show-game');
  }

  private error(): void{
    this.pageState.set('error'); 
    this.sounds.playSound('wrong');
  }
}
