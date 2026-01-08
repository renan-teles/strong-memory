import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWord } from '../../../features/game/model/word.model';
import { IRandomWord } from '../../../features/game/model/random-word.model';

@Injectable({
  providedIn: 'root',
})
export class RandomWordApiService {
  private readonly URL = "https://random-words-api.kushcreates.com/api";
  private readonly http = inject(HttpClient);

  getRandomWords(
    category: string, 
    words: number, 
    language: string
  ): Observable<IWord[]>{
    return this.http
      .get<IRandomWord[]>(
          this.URL, 
          { 
            params: { 
              language,
              category,
              type: 'lowercase',
              words
            }
        }
      )
      .pipe(
        map(words =>
          words.map(w => ({ word: w.word }))
        )
      );
  }
}
