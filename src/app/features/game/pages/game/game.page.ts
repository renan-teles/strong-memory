import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SoundService } from '../../../../core/services/sound/sound.service';
import { GamePageFacade } from '../../facade/game-page/game-page.facade';
import { WordsGameComponent } from '../../components/game/words-game/words-game.component';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { LoadingWordsComponent } from '../../../../shared/components/loading-words/loading-words.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    WordsGameComponent, 
    ErrorComponent, 
    LoadingWordsComponent
  ],
  templateUrl: './game.page.html',
})
export class GamePage implements OnInit, OnDestroy {
  private readonly facade = inject(GamePageFacade);
  private readonly currentRoute = inject(ActivatedRoute);
  private readonly sounds = inject(SoundService);
  private readonly destroyRef = inject(DestroyRef);

  loading = this.facade.loadingWords;
  error = this.facade.errorGetWords;
  words = this.facade.words;

  ngOnInit(): void{
    this.loadWords();
  }

  ngOnDestroy(): void {
    this.sounds.stopAllSounds();
  }

  private loadWords(): void {
    this.currentRoute.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.facade.loadWords(params.get('wc'));
      });
  }
}
