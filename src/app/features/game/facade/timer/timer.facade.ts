import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerFacade {
  readonly time = signal<number>(0); 
  private readonly displayTimeWords = signal<number>(5); 
  private readonly answerTime = signal<number>(30); 

  setTimeToDisplayTimerWords(): void{
    this.time.set(this.displayTimeWords()); 
  }

  updateTimes(): void{
    this.displayTimeWords.update(t => t + 2); 
    this.answerTime.update(t => t + 5); 
  }

  resetTimer(): void{
    this.displayTimeWords.set(5); 
    this.answerTime.set(30); 
  } 

  setTimeToAnswerTime(): void{ 
    this.time.set(this.answerTime()); 
  } 
}
