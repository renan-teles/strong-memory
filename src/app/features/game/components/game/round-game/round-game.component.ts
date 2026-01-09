import { Component, computed, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IWord } from '../../../model/word.model';
import { CommonModule } from '@angular/common';
import { GameState } from '../../../../../shared/types/game-state.type';
import { NoTimeLeftComponent } from '../no-time-left/no-time-left.component';
import { TimerComponent } from '../../general/timer/timer.component';
import { WordsListComponent } from '../../general/lists/words-list/words-list.component';
import { UserWordsFormComponent } from '../../general/forms/user-words-form/user-words-form.component';
import { FeedbackComponent } from '../../general/feedback/feedback.component';
import { RoundGameFacade } from '../../../facade/round-game/round-game.facade';

@Component({
  selector: 'app-round-game',
  standalone: true,
  imports: [
    CommonModule,
    FeedbackComponent, 
    TimerComponent, 
    WordsListComponent, 
    UserWordsFormComponent,
    NoTimeLeftComponent
  ],
  templateUrl: './round-game.component.html',
  styleUrl: './round-game.component.css',
})
export class RoundGameComponent implements OnInit, OnDestroy{
  @Input({ required: true }) words!: IWord[];

  readonly roundFacade = inject(RoundGameFacade);
  
  @Output() stateGame = this.roundFacade.stateGame;

  showResult = this.roundFacade.showResult;
  isCorrect = this.roundFacade.isCorrect;
  answer = this.roundFacade.answer;
  time = this.roundFacade.time;
  noTimeLeft = this.roundFacade.noTimeLeft;
  hasUserState = this.roundFacade.hasUserState;
  score = this.roundFacade.score;

  readonly title = computed(() =>
    this.roundFacade.roundState() === 'show-result'
      ? 'Palavras digitadas:'
      : 'Digite as palavras da lista:'
  );

  readonly btnFeedback = computed(() => {
    if (!this.hasUserState()) return null;

    return this.isCorrect()
      ? { text: 'Próximo', icon: 'bi-arrow-right', action: () => this.next() }
      : { text: 'Tentar novamente', icon: 'bi-arrow-clockwise', action: () => this.reset() };
  });

  ngOnInit(): void {
    this.roundFacade.init(this.words);
  }

  ngOnDestroy(): void {
    this.roundFacade.destroy();
  }

  onTimerFinished(): void {
    this.roundFacade.onTimerFinished();
  }

  checkCorrect(userWords: string[]): void {
    this.roundFacade.checkCorrect(userWords);
  }

  next(): void {
    this.roundFacade.nextRound();
  }

  reset(): void {
    this.roundFacade.resetGame();
  }

  reloadPage(): void {
    location.reload();
  }
}