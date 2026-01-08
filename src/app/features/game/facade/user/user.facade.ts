import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  readonly userState = signal<'no-result' | 'correct' | 'wrong'>('no-result'); 
  readonly hasUserState = computed(() => this.userState() !== 'no-result'); 
  readonly isCorrect = computed(() => this.userState() === 'correct'); 

  setToNoResult(): void{
    this.userState.set('no-result');
  }

  setToCorrect(): void{
    this.userState.set('correct');
  }

  setToWrong(): void{
    this.userState.set('wrong');
  }
}
