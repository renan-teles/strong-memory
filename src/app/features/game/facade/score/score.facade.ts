import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreFacade {
  readonly score = signal<number>(0);

  updateScore(): void{
    this.score.update(s => s + 1); 
  }

  resetScore(): void{
    this.score.set(0); 
  }
}
