import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsService } from '../../../../services/word/words-service.service';
import { WordInputComponent } from '../../inputs/word-input/word-input.component';
import { IWordComparator } from '../../../../../../shared/interfaces/word-comparator.interface';

@Component({
  selector: 'app-words-list',
  imports: [CommonModule, WordInputComponent],
  standalone: true,
  templateUrl: './words-list.component.html',
  styleUrl: './words-list.component.css',
})
export class WordsListComponent implements IWordComparator{
  compareWords = input<boolean>(false);

  private readonly wordsService = inject(WordsService);
  
  get words(){
    return this.wordsService.getCurrentWords();
  }

  equalWordsByIndex(index: number): boolean {
    return this.wordsService.compareCurrentWordsAndUserWordsByIndex(index);
  }
}
