import { Component, computed, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { WordsService } from '../../../services/word/words-service.service';
import { SoundService } from '../../../../../core/services/sound/sound.service';
import { TimerFacade } from '../../../facade/timer/timer.facade';
import { UserFacade } from '../../../facade/user/user.facade';
import { ScoreFacade } from '../../../facade/score/score.facade';
import { IWord } from '../../../model/word.model';
import { CommonModule } from '@angular/common';
import { GameState } from '../../../../../shared/types/game-state.type';
import { NoTimeLeftComponent } from '../no-time-left/no-time-left.component';
import { TimerComponent } from '../../general/timer/timer.component';
import { WordsListComponent } from '../../general/lists/words-list/words-list.component';
import { UserWordsFormComponent } from '../../general/forms/user-words-form/user-words-form.component';
import { FeedbackComponent } from '../../general/feedback/feedback.component';

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
  @Output() stateGame = new EventEmitter<GameState>(); 

  private readonly wordsService = inject(WordsService); 
  private readonly sounds = inject(SoundService);

  private readonly timerFacade = inject(TimerFacade);
  private readonly userFacade = inject(UserFacade);
  private readonly scoreFacade = inject(ScoreFacade);

  time = this.timerFacade.time;
  userState = this.userFacade.userState;
  hasUserState = this.userFacade.hasUserState;
  score = this.scoreFacade.score;
  isCorrect = this.userFacade.isCorrect;

  get lengthCurrentWords(){
    return this.wordsService.getCurrentWords().length;
  }

  readonly roundState = signal<'answer' | 'show-words' | 'show-result' | 'no-time-left'>('show-words'); 
  readonly noTimeLeft = computed(() => this.roundState() === 'no-time-left');
  readonly answer = computed(() => this.roundState() === 'answer');
  readonly showResult = computed(() => this.roundState() === 'show-result');
  
  readonly title = computed(() => this.showResult()? 'Palavras digitadas:' : 'Digite as palavras da lista:');
  readonly btnFeedback = computed(() => {  
    if (!this.hasUserState()) return null;
    return (this.isCorrect())
      ? { text: 'Próximo', icon: 'bi-arrow-right' } 
      : { text: 'Tentar novamente', icon: 'bi-arrow-clockwise' }; 
  });

  ngOnInit(): void{ 
    this.wordsService.setWords(this.words); 
    this.scoreFacade.resetScore(); 
    this.startRound(); 
  }

  ngOnDestroy(): void {
    this.wordsService.reset(); 
    this.timerFacade.resetTimer();
  }
    
  private startRound(): void{ 
    this.wordsService.next(); 
    this.roundState.set('show-words'); 
    this.userFacade.setToNoResult(); 
    this.timerFacade.setTimeToDisplayTimerWords();
    this.stateGame.emit('show-game');
  }

  onTimerFinished(): void{ 
    if(this.answer()){
      this.sounds.playSound('wrong');
      this.roundState.set('no-time-left');
      return;
    }
    this.sounds.playSound('go'); 
    this.roundState.set('answer'); 
    this.timerFacade.setTimeToAnswerTime();
  } 

  checkCorrect(userWords: string[]): void{ 
    this.wordsService.setUserWords(userWords);
    this.roundState.set('show-result'); 

    if (!this.wordsService.isCorrect()) { 
      this.userFacade.setToWrong(); 
      this.sounds.playSound('wrong'); 
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

  next(): void{ 
    this.timerFacade.updateTimes();
    this.startRound(); 
  } 
 
  reset(): void{
    this.wordsService.reset(); 
    this.scoreFacade.resetScore(); 
    this.timerFacade.resetTimer();
    this.startRound(); 
  } 
  
  reloadPage(): void{ 
    location.reload(); 
  } 
}
