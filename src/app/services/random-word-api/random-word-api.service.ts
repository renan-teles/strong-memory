import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWord } from '../../model/word.model';
import { IRandomWord } from '../../model/random-word.model';

@Injectable({
  providedIn: 'root',
})
export class RandomWordApiService {
  private readonly baseUrl = "https://random-words-api.kushcreates.com/api";
  private readonly http = inject(HttpClient);

  getRandomWords(
    category: string, 
    words: number, 
    language: string
  ): Observable<IWord[]>{
    return this.http
      .get<IRandomWord[]>(
          this.baseUrl, 
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
