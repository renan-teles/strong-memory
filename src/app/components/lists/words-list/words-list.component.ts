import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game/game.service';
import { WordInputComponent } from '../../forms/inputs/word-input/word-input.component';
import { IWordComparator } from '../../../shared/word-comparator.interface';
import { IWord } from '../../../model/word.model';

@Component({
  selector: 'app-words-list',
  imports: [CommonModule, WordInputComponent],
  standalone: true,
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements IWordComparator{
  compare = input<boolean>(false);

  private readonly game = inject(GameService);

  get words(): IWord[] {
    return this.game.getCurrentWords();
  }

  equalWordsByIndex(index: number): boolean {
    return this.game.compareCurrentWordsAndUserWordsByIndex(index);
  }
}
