import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { SoundService } from '../../services/sound/sound.service';
import { GameService } from '../../services/game/game.service';
import { TimerComponent } from '../timer/timer.component';
import { WordsListComponent } from '../lists/words-list/words-list.component';
import { UserWordsFormComponent } from '../forms/user-words-form/user-words-form.component';
import { IWord } from '../../model/word.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [CommonModule, RouterLink, TimerComponent, WordsListComponent, UserWordsFormComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy{ 
  @Input({ required: true }) words!: IWord[]; 

  private readonly game = inject(GameService); 
  private readonly sounds = inject(SoundService); 

  readonly userState = signal<'no-result' | 'correct' | 'wrong'>('no-result'); 
  readonly gameState = signal<'answer' | 'show-words' | 'show-result'>('show-words'); 
  readonly componentState = signal<'end' | 'no-time-left' | 'show-game'>('show-game'); 

  readonly score = signal<number>(0);

  readonly time = signal<number>(0); 
  readonly displayTimeWords = signal<number>(5); 
  readonly answerTime = signal<number>(30); 

  readonly answer = computed(() => this.gameState() === 'answer');
  readonly showResult = computed(() => this.gameState() === 'show-result');
  readonly hasUserState = computed(() => this.userState() !== 'no-result'); 
  readonly isCorrect = computed(() => this.userState() === 'correct'); 

  readonly feedback = computed(() => { 
    if(!this.hasUserState()) return null; 
    return (this.isCorrect()) 
      ? { text: 'Correto', class: 'text-success', icon: 'bi-check-circle-fill' } 
      : { text: 'Incorreto', class: 'text-danger', icon: 'bi-x-circle-fill' }; 
    }); 
  
  readonly btnFeedback = computed(() => { 
    if(!this.hasUserState()) return null; 
    return (this.isCorrect()) 
      ? { text: 'Próximo', icon: 'bi-arrow-right' } 
      : { text: 'Tentar novamente', icon: 'bi-arrow-clockwise' }; 
    }); 
      
  get currentWordsLength(): number{
    return this.game.getCurrentWords().length; 
  } 
    
  ngOnInit(): void{ 
    this.game.setWords(this.words); 
    this.startRound(); 
  }
  
  ngOnDestroy(): void { 
    this.sounds.stopAllSounds();
  } 
    
  private startRound(): void{ 
    this.game.next(); 
    this.componentState.set('show-game');
    this.userState.set('no-result'); 
    this.gameState.set('show-words'); 

    this.time.set(this.displayTimeWords()); 
  } 
  
  onTimerFinished(): void{ 
    if(this.answer()){
      this.sounds.playSound('wrong');
      this.componentState.set('no-time-left');
      return;
    }

    this.sounds.playSound('go'); 
    this.gameState.set('answer'); 
    this.time.set(this.answerTime()); 
  } 
  
  checkCorrect(userWords: string[]): void{ 
    this.game.setUserWords(userWords);
    this.gameState.set('show-result'); 

    if (!this.game.isCorrect()) { 
      this.userState.set('wrong'); 
      this.sounds.playSound('wrong'); 
      return; 
    } 
    
    this.userState.set('correct'); 
    this.score.update(s => s + 1); 
    
    if (this.game.isInEnd()) { 
      this.componentState.set('end');
      this.sounds.playSound('end');
      return; 
    } 
    
    this.sounds.playSound('correct');
  } 

  next(): void{ 
    this.displayTimeWords.update(t => t + 2); 
    this.answerTime.update(t => t + 5); 
    this.startRound(); 
  } 
    
  reset(): void{
    this.game.reset(); 
    this.score.set(0); 
    this.displayTimeWords.set(5); 
    this.answerTime.set(30); 
    this.startRound(); 
  } 
  
  reloadPage(): void{ 
    location.reload(); 
  } 
}
