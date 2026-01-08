import { Component, inject, Input, OnDestroy, signal } from '@angular/core';
import { EndGameComponent } from '../end-game/end-game.component';
import { IWord } from '../../../model/word.model';
import { GameState } from '../../../../../shared/types/game-state.type';
import { SoundService } from '../../../../../core/services/sound/sound.service';
import { RoundGameComponent } from '../round-game/round-game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-words-game',
  standalone: true,
  imports: [
    CommonModule,
    EndGameComponent,
    RoundGameComponent
  ],
  templateUrl: './words-game.component.html',
  styleUrl: './words-game.component.css',
})
export class WordsGameComponent implements OnDestroy { 
  @Input({ required: true }) words!: IWord[];

  readonly gameState = signal<GameState>('show-game'); 
  private readonly sounds = inject(SoundService);

  ngOnDestroy(): void { 
    this.sounds.stopAllSounds();
  } 

  setState(state: GameState): void{
    this.gameState.set(state);
  }
}
