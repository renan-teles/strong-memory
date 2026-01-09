import { computed, EventEmitter, inject, Injectable, signal } from '@angular/core';
import { GameState } from '../../../../shared/types/game-state.type';
import { SoundService } from '../../../../core/services/sound/sound.service';
import { TimerFacade } from '../timer/timer.facade';
import { WordsService } from '../../services/word/words-service.service';
import { ScoreFacade } from '../score/score.facade';
import { UserFacade } from '../user/user.facade';
import { IWord } from '../../model/word.model';

@Injectable({
  providedIn: 'root',
})
export class RoundGameFacade {
  private readonly wordsService = inject(WordsService);
  private readonly sounds = inject(SoundService);
  private readonly timerFacade = inject(TimerFacade);
  private readonly userFacade = inject(UserFacade);
  private readonly scoreFacade = inject(ScoreFacade);

  readonly stateGame = new EventEmitter<GameState>();

  readonly roundState = signal<
    'answer' | 'show-words' | 'show-result' | 'no-time-left'
  >('show-words');

  readonly noTimeLeft = computed(() => this.roundState() === 'no-time-left');
  readonly answer = computed(() => this.roundState() === 'answer');
  readonly showResult = computed(() => this.roundState() === 'show-result');

  readonly time = this.timerFacade.time;
  readonly userState = this.userFacade.userState;
  readonly hasUserState = this.userFacade.hasUserState;
  readonly score = this.scoreFacade.score;
  readonly isCorrect = this.userFacade.isCorrect;

  get lengthCurrentWords(): number {
    return this.wordsService.getCurrentWords().length;
  }

  init(words: IWord[]): void {
    this.wordsService.setWords(words);
    this.scoreFacade.resetScore();
    this.startRound();
  }

  destroy(): void {
    this.wordsService.reset();
    this.timerFacade.resetTimer();
  }

  private startRound(): void {
    this.wordsService.next();
    this.roundState.set('show-words');
    this.userFacade.setToNoResult();
    this.timerFacade.setTimeToDisplayTimerWords();
    this.stateGame.emit('show-game');
  }

  onTimerFinished(): void {
    if (this.answer()) {
      this.sounds.playSound('wrong');
      this.roundState.set('no-time-left');
      return;
    }

    this.sounds.playSound('go');
    this.roundState.set('answer');
    this.timerFacade.setTimeToAnswerTime();
  }

  checkCorrect(userWords: string[]): void {
    this.wordsService.setUserWords(userWords);
    this.roundState.set('show-result');

    if (!this.wordsService.isCorrect()) {
      this.userFacade.setToWrong();
      this.sounds.playSound('wrong');
      this.timerFacade.resetTimer();
      return;
    }

    this.userFacade.setToCorrect();
    this.scoreFacade.updateScore();

    if (this.wordsService.isInEnd()) {
      this.sounds.playSound('end');
      this.timerFacade.resetTimer();
      this.stateGame.emit('end');
      return;
    }

    this.sounds.playSound('correct');
  }

  nextRound(): void {
    this.timerFacade.updateTimes();
    this.startRound();
  }

  resetGame(): void {
    this.wordsService.reset();
    this.scoreFacade.resetScore();
    this.timerFacade.resetTimer();
    this.startRound();
  }
}
