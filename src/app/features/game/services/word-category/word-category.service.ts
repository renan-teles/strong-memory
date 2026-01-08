import { Injectable } from '@angular/core';
import { IWordCategory } from '../../model/word-category.model';

@Injectable({
  providedIn: 'root',
})
export class WordCategoryService {
  private readonly wordCategories: IWordCategory[] = [
    { category: 'Todas as Categorias', value: 'all', language: 'pt-br' },
    { category: 'Animais', value: 'animals', language: 'pt-br' },
    { category: 'Companhias', value: 'companies', language: 'en' },
    { category: 'Esportes', value: 'sports', language: 'pt-br' },
    { category: 'Jogos', value: 'games', language: 'en' },
    { category: 'Linguagens de Programação', value: 'programming_languages', language: 'en' },
    { category: 'Países', value: 'countries', language: 'pt-br' },
    { category: 'Softwares', value: 'softwares', language: 'en' },
  ];

  getAll(): IWordCategory[] {
    return this.wordCategories;
  }

  findByValue(value: string): IWordCategory | null{
    return this.wordCategories.find(c => c.value === value) ?? null;
  }
}
