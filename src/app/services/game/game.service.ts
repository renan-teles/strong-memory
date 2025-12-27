import { Injectable } from '@angular/core';
import { IWord } from '../../model/word.model';
import { shuffle } from '../../utils/shuffle.utils';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private words: IWord[] = [];
  private counter: number = 0;
  private currentWords: IWord[] = [];
  private userWords: string[] = [];

  getCurrentWords(): IWord[]{
    return this.currentWords;
  }

  getUserWords(): string[]{
    return this.userWords;
  }

  setUserWords(words: string[]): void{
    this.userWords = words;
  }

  setWords(words: IWord[]): void {
    this.words = words;
    this.reset();
  }

  hasWords(): boolean {
    return this.words.length > 0;
  }

  isInEnd(): boolean {
    return this.counter >= this.words.length;
  }

  compareCurrentWordsAndUserWordsByIndex(index: number): boolean {
    const current = this.currentWords?.[index];
    const user = this.userWords?.[index];

    if (!current || !user) return false;
    return current.word.trim() === user.trim();
  }

  reset(): void {
    this.words = shuffle([...this.words]);
    this.currentWords = [];
    this.userWords = [];
    this.counter = 0;
  }

  next(): void {
    this.ensureWords();
    this.ensureLimit();

    this.currentWords.push(this.words[this.counter]);
    this.counter++;
  }

  isCorrect(): boolean {
    this.ensureWords();

    if (this.currentWords.length !== this.userWords.length) {
      return false;
    }

    return this.currentWords.every(
      (w, i) => w.word.trim().toLowerCase() === this.userWords[i].trim().toLowerCase()
    );
  }

  private ensureWords(): void {
    if (!this.hasWords()) {
      throw new Error('Palavras não definidas.');
    }
  }

  private ensureLimit(): void {
    if (this.isInEnd()) {
      throw new Error('Limite de palavras atingido.');
    }
  }
}
